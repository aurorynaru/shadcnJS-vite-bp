import dotenv from 'dotenv'
import axios from 'axios'
import { octokit } from '../utils/utils.js'
dotenv.config()

const url = process.env.VITE_GITHUB_URL

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const getCode = async (req, res) => {
    const { url } = req.query

    try {
        const response = await axios.get(url, {
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${process.env.VITE_GITHUB_API}`,
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })

        return res.status(200).json(response.data)
    } catch (error) {
        console.error(
            'Error fetching data from GitHub API(CODE):',
            error.response?.data || error.message
        )
        return res.status(404).json({
            message: error.response?.data || error.message
        })
    }
}

export const getDir = async (req, res) => {
    await delay(1000)
    const { url } = req.query

    try {
        // const response = await axios.get(url, {
        //     headers: {
        //         Accept: 'application/vnd.github+json',
        //         Authorization: `Bearer ${process.env.VITE_GITHUB_API}`,
        //         'X-GitHub-Api-Version': '2022-11-28'
        //     }
        // })

        const response = await octokit.request(`GET ${url}`, {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })

        return res.status(200).json(response.data)
    } catch (error) {
        console.error(
            'Error fetching data from GitHub API(DIR):',
            error.response?.data || error.message
        )
        return res.status(404).json({
            message: error.response?.data.message
        })
    }
}

export const getFolderContents = async (url) => {
    try {
        const response = await octokit.request(`GET ${url}`, {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })

        if (response.status === 200) {
            const resArr = await Promise.all(
                response.data.map(async (elem) => {
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
                            content: await getFolderContents(elem.url)
                        }
                    }
                })
            )
            return resArr
        }

        console.log(resArr)
    } catch (error) {
        console.error(
            'Error fetching data from GitHub API(FOLDER):',
            error.response?.data || error.message
        )
        return res.status(404).json({
            message: error.response?.data.message
        })
    }
}

export const getRepos = async (req, res) => {
    try {
        const {
            page = 1,
            per_page = 3,
            sort = 'pushed',
            direction = 'desc'
        } = req.query

        const finalUrl =
            url +
            '?' +
            'page=' +
            page +
            '&' +
            'per_page=' +
            per_page +
            '&' +
            'sort=' +
            sort +
            '&' +
            'direction=' +
            direction

        // const response = await axios.get(finalUrl, {
        //     headers: {
        //         Accept: 'application/vnd.github+json',
        //         Authorization: `Bearer ${process.env.VITE_GITHUB_API}`,
        //         'X-GitHub-Api-Version': '2022-11-28'
        //     }
        // })

        const response = await octokit.request(`GET ${finalUrl}`, {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })

        if (response.status === 200) {
            const new_res = await Promise.all(
                response.data.map(async (prj) => {
                    const {
                        id,
                        name,
                        description,
                        language,
                        full_name,
                        html_url,
                        updated_at,
                        contents_url
                    } = prj

                    const langRatio = await octokit.request(
                        `GET ${process.env.VITE_GITHUB_REPO}${full_name}/languages`,
                        {
                            headers: {
                                'X-GitHub-Api-Version': '2022-11-28'
                            }
                        }
                    )

                    const LangRatioArr = []

                    for (const [key, value] of Object.entries(langRatio.data)) {
                        const keyObject = {
                            language: key,
                            color: value,
                            isHovered: false
                        }

                        LangRatioArr.push(keyObject)
                    }

                    const contents = await getFolderContents(
                        contents_url.replace('{+path}', '')
                    )

                    const new_obj = {
                        contents,
                        id,
                        name,
                        description,
                        language,
                        LangRatioArr,
                        full_name,
                        html_url,
                        updated_at
                    }

                    return new_obj
                })
            )

            return res.status(200).json({ repos: new_res })
        }
    } catch (error) {
        console.error(
            'Error fetching data from GitHub API(REPO):',
            error.response?.data || error.message
        )
        return res.status(404).json({
            message: error.response?.data.message
        })
    }
}
