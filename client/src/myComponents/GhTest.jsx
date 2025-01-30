import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { removeSha } from '../utils/utils'

const GhTest = ({ ...props }) => {
    const headers = {}

    const getRepo = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${import.meta.env.GITHUB_API}`
            }
        }

        try {
            const res = await axios.get(
                'https://api.github.com/users/aurorynaru/repos',
                {},
                config
            )

            if (res.status === 200) {
                await Promise.all(
                    res.data.map(async (elem) => {
                        if (elem.name === 'audio') {
                            const url = removeSha(elem.commits_url)
                            console.log(url)
                            const sat = await axios.get(url, {}, config)
                            console.log(sat)
                        }
                    })
                )
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getRepo()
    }, [])
    return <div>Github</div>
}

export default GhTest
