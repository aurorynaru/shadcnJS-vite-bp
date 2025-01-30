import { Octokit } from 'octokit'

export const removeSha = (url, removeString = '{/sha}') => {
    return url.replace(removeString, '')
}

export const convertDate = (date) => {
    const newDate = new Date(date)

    const options = { year: 'numeric', month: 'long', day: 'numeric' }

    const formattedDate = newDate.toLocaleDateString('en-US', options)
    return formattedDate
}

export const config_ = {
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API}`,
        'X-GitHub-Api-Version': '2022-11-28'
    }
}

export const config = {
    username: import.meta.env.VITE_GITHUB_NAME,
    headers: {
        'X-GitHub-Api-Version': '2022-11-28'
    }
}

export const octokit = new Octokit({
    auth: import.meta.env.VITE_GITHUB_API
})

export const lightenColor = (hex, percent) => {
    if (typeof hex !== 'string' || !/^#?[0-9A-Fa-f]{6}$/.test(hex)) {
        console.error('Invalid hex color:', hex)
        return hex // Return the original value as a fallback
    }

    if (typeof percent !== 'number' || percent < 0 || percent > 1) {
        console.error('Invalid percent value:', percent)
        return hex // Return the original value as a fallback
    }
    hex = hex.replace(/^#/, '')

    let r = parseInt(hex.substring(0, 2), 16)
    let g = parseInt(hex.substring(2, 4), 16)
    let b = parseInt(hex.substring(4, 6), 16)

    r = Math.min(255, Math.floor(r + (255 - r) * percent))
    g = Math.min(255, Math.floor(g + (255 - g) * percent))
    b = Math.min(255, Math.floor(b + (255 - b) * percent))

    const data = `#${r.toString(16).padStart(2, '0')}${g
        .toString(16)
        .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`

    return data
}

export const sortAlphabetically = (data) => {
    return data.sort((a, b) => {
        const nameA = a.name.toUpperCase() // ignore upper and lowercase
        const nameB = b.name.toUpperCase() // ignore upper and lowercase
        if (nameA < nameB) {
            return -1
        }
        if (nameA > nameB) {
            return 1
        }

        return 0
    })
}

export const sortArr = (data) => {
    const folderArr = []
    const fileArr = []

    data.forEach((item) => {
        if (item.type === 'file') {
            fileArr.push(item)
        } else {
            folderArr.push(item)
        }
    })

    return sortAlphabetically(folderArr).concat(sortAlphabetically(fileArr))
}
