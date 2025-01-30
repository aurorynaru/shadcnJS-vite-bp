import React, { useState } from 'react'
import ModalComponent from './ModalComponent'
import { Button } from '@/components/ui/button'
import { convertDate, lightenColor } from '../utils/utils'

const RenderProj = ({ ...props }) => {
    const [selectedProj, setSelectedProj] = useState({})
    const {
        projects,
        setHovered,
        removeHovered,
        isOpen,
        setIsOpen,
        colors,
        markdownContent
    } = props

    return (
        <>
            {projects.length > 0 &&
                projects.map((project, index) => {
                    const {
                        id,
                        name,
                        description,
                        language,
                        full_name,
                        LangRatioArr,
                        html_url,
                        updated_at,
                        isHovered,
                        contents
                    } = project

                    // const langArr = Object.keys(langRatio)

                    let total = 0

                    LangRatioArr.forEach((elem) => (total += elem.color))

                    const langPercent = {}

                    LangRatioArr.forEach((elem) => {
                        const percentage = ((elem.color / total) * 100).toFixed(
                            2
                        )

                        langPercent[elem.language] = percentage + '%'
                    })

                    return (
                        <div
                            className=' p-4 flex flex-col w-full border-b-2 gap-3 cursor-pointer opacity-85 hover:opacity-100'
                            key={index}
                            onClick={(e) => {
                                setIsOpen(true)
                            }}
                        >
                            <a
                                className='text-xl font-semibold cursor-pointer w-fit  hover:underline  no-underline  '
                                target='_blank'
                                href={html_url}
                            >
                                {name}
                            </a>

                            <div className='flex items-center gap-2 flex-col '>
                                <div className='flex w-full px-4 items-center'>
                                    {LangRatioArr.map((elem, index) => {
                                        const length = LangRatioArr.length

                                        let className = ''

                                        if (length == 1) {
                                            className = 'rounded-full'
                                        }
                                        if (length > 1) {
                                            if (index == 0) {
                                                className =
                                                    'rounded-tl-full rounded-bl-full'
                                            }

                                            if (index == length - 1) {
                                                className =
                                                    'rounded-tr-full rounded-br-full '
                                            }
                                        }

                                        return (
                                            <span
                                                key={index}
                                                onMouseEnter={(e) => {
                                                    setHovered(
                                                        id,
                                                        elem.language
                                                    )
                                                }}
                                                onMouseLeave={(e) => {
                                                    removeHovered(
                                                        id,
                                                        elem.language
                                                    )
                                                }}
                                                className={`h-3  ${className} cursor-pointer   `}
                                                style={{
                                                    width: langPercent[
                                                        elem.language
                                                    ],
                                                    backgroundColor:
                                                        elem.isHovered
                                                            ? lightenColor(
                                                                  colors[
                                                                      elem
                                                                          .language
                                                                  ],
                                                                  0.08
                                                              )
                                                            : colors[
                                                                  elem.language
                                                              ]
                                                }}
                                            ></span>
                                        )
                                    })}
                                </div>
                                {
                                    <div className='flex '>
                                        {LangRatioArr.map((elem, index) => {
                                            return (
                                                <div
                                                    className='flex items-center px-4 text-sm cursor-pointer'
                                                    key={index}
                                                >
                                                    <div
                                                        onMouseEnter={(e) => {
                                                            setHovered(
                                                                id,
                                                                elem.language
                                                            )
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            removeHovered(
                                                                id,
                                                                elem.language
                                                            )
                                                        }}
                                                        className='flex justify-center items-center'
                                                    >
                                                        <span
                                                            className={`h-2 w-2 rounded-2xl mr-1`}
                                                            style={{
                                                                backgroundColor:
                                                                    elem.isHovered
                                                                        ? lightenColor(
                                                                              colors[
                                                                                  elem
                                                                                      .language
                                                                              ],
                                                                              0.3
                                                                          )
                                                                        : colors[
                                                                              elem
                                                                                  .language
                                                                          ]
                                                            }}
                                                        ></span>
                                                        <div className='flex items-center justify-center gap-1'>
                                                            <span>
                                                                {elem.language}
                                                            </span>
                                                            <span>
                                                                {
                                                                    langPercent[
                                                                        elem
                                                                            .language
                                                                    ]
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                }
                            </div>
                            {description && (
                                <p className='text-sm'>{description}</p>
                            )}
                            {updated_at && (
                                <p className=''>
                                    Updated on {convertDate(updated_at)}
                                </p>
                            )}
                            <>
                                <Button
                                    variant='secondary'
                                    onClick={() => {
                                        setSelectedProj(project)
                                        props.setIsOpen(true)
                                    }}
                                >
                                    Show code
                                </Button>
                            </>
                        </div>
                    )
                })}

            {Object.keys(selectedProj).length > 0 && isOpen && (
                <ModalComponent
                    name={selectedProj.name}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    setSelectedProj={setSelectedProj}
                    project={selectedProj}
                />
            )}
        </>
    )
}

export default RenderProj
