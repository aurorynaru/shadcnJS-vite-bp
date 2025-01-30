import dotenv from 'dotenv'
import { Octokit } from 'octokit'
dotenv.config()

export const octokit = new Octokit({
    auth: process.env.VITE_GITHUB_API
})
