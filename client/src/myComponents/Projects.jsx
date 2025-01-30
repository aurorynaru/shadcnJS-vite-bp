import React, { useEffect, useState } from 'react'
import AnimatedSection from './AnimatedSection'
import { ScrollArea } from '@/components/ui/scroll-area'
import axios from 'axios'
import {
    config,
    config_,
    convertDate,
    lightenColor,
    removeSha
} from '../utils/utils'
import { octokit } from '../utils/utils'
import ModalComponent from './ModalComponent'
import RenderProj from './RenderProj'

const PROXY_URL_CODE = import.meta.env.PROXY_URL_CODE
const PROXY_URL_DIR = import.meta.env.PROXY_URL_DIR
const Projects = ({ ...props }) => {
    const githubName = import.meta.env.VITE_GITHUB_NAME
    const [markdownContent, setMarkdownContent] = useState('')
    const [projects, setProjects] = useState([])
    const [colors, setColors] = useState({})
    const [langObj, setLangObj] = useState({})
    let [isOpen, setIsOpen] = useState(false)

    const getColors = async () => {
        const res = await fetch('./data.json')
        const colorsJson = await res.json()

        setColors(colorsJson)
    }

    const getIndex = (prev, id) => {
        return prev.findIndex((prj) => prj.id === id)
    }

    const setHovered = (id, elemLang) => {
        setProjects((prev) => {
            const projectIndex = getIndex(prev, id)

            const larr = prev[projectIndex].LangRatioArr.map((elem) => {
                if (elem.language === elemLang) {
                    elem.isHovered = true

                    return elem
                } else {
                    return elem
                }
            })

            const update = prev.map((elem) => {
                if (elem.id === id) {
                    elem.LangRatioArr = larr
                    return elem
                } else {
                    return elem
                }
            })

            return update
        })
    }

    const removeHovered = (id, elemLang) => {
        setProjects((prev) => {
            const projectIndex = getIndex(prev, id)
            const larr = prev[projectIndex].LangRatioArr.map((elem) => {
                if (elem.language === elemLang) {
                    elem.isHovered = false
                    return elem
                } else {
                    return elem
                }
            })

            const update = prev.map((elem) => {
                if (elem.id === id) {
                    elem.LangRatioArr = larr
                    return elem
                } else {
                    return elem
                }
            })
            return update
        })
    }

    const getGitCode = async (url) => {
        try {
            const res = await axios(
                `${
                    import.meta.env.VITE_PROXY_URL_CODE
                }?url=${encodeURIComponent(url)}`
            )
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const getFolderContents = async (url) => {
        try {
            const res = await axios(url)

            if (res.status === 200) {
                const resArr = await Promise.all(
                    res.data.map(async (elem) => {
                        if (elem.type === 'file') {
                            return {
                                type: 'file',
                                name: elem.name,
                                code_url: elem.download_url
                            }
                        }
                        if (elem.type === 'dir') {
                            return {
                                type: 'dir',
                                name: elem.name,
                                [elem.name]: await getFolderContents(elem.url)
                            }
                        }
                    })
                )
                return resArr
            }

            console.log(resArr)
        } catch (error) {
            console.log(error)
        }
    }
    //convert to octokit
    const getRepo = async () => {
        try {
            // const res = await octokit.request(
            //     `GET /users/${githubName}/repos`,
            //     {
            //         headers: {
            //             'X-GitHub-Api-Version': '2022-11-28'
            //         }
            //     }
            // )

            const res = await axios(
                `http://localhost:3000/proxy/get-repos?per_page=${3}`
            )

            if (res.status === 200) {
                // const result = await Promise.all(
                //     res.data.map(async (data) => {
                //         try {
                //             const result = await axios.get(
                //                 `${import.meta.env.VITE_GITHUB_REPO}${
                //                     data.full_name
                //                 }/languages`,
                //                 config_
                //             )

                //             data.langRatio = result.data
                //         } catch (error) {
                //             console.error(
                //                 `Failed to fetch language data for ${data.full_name}`,
                //                 error
                //             )
                //             data.langRatio = {}
                //         }

                //         return data
                //     })
                // )

                // const new_res = await Promise.all(
                //     result.map(async (prj) => {
                //         const {
                //             id,
                //             name,
                //             description,
                //             language,
                //             full_name,
                //             langRatio,
                //             html_url,
                //             updated_at,
                //             contents_url
                //         } = prj

                //         const LangRatioArr = []

                //         for (const [key, value] of Object.entries(langRatio)) {
                //             const keyObject = {
                //                 language: key,
                //                 color: value,
                //                 isHovered: false
                //             }

                //             LangRatioArr.push(keyObject)
                //         }

                //         // const contents = await getFolderContents(
                //         //     contents_url.replace('{+path}', '')
                //         // )

                //         const new_obj = {
                //             contents,
                //             id,
                //             name,
                //             description,
                //             language,
                //             full_name,
                //             LangRatioArr,
                //             html_url,
                //             updated_at
                //         }

                //         return new_obj
                //     })
                // )

                setProjects(res.data.repos)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getColors()
        getRepo()

        // getTest()
    }, [])
    //console.log(projects)
    return (
        <div className='flex justify-center w-full'>
            <AnimatedSection
                className={`p-5  rounded-md border ${props.className} w-4/5`}
            >
                <h2 className='text-3xl font-bold mb-4 shadow-xl'>
                    Github projects
                </h2>
                <ScrollArea className='h-[650px] w-full'>
                    <div className='max-w-4xl mx-auto rounded-lg shadow-lg p-8'>
                        <div className='flex flex-col justify-center items-center w-full'>
                            {projects.length > 0 && (
                                <RenderProj
                                    projects={projects}
                                    setHovered={setHovered}
                                    removeHovered={removeHovered}
                                    isOpen={isOpen}
                                    setIsOpen={setIsOpen}
                                    colors={colors}
                                    markdownContent={markdownContent}
                                />
                            )}

                            {/* {projects.length > 0 && (
                            <AppSidebar projects={projects[0].contents} />
                        )} */}
                        </div>
                    </div>
                </ScrollArea>
            </AnimatedSection>
        </div>
    )
}

export default Projects
