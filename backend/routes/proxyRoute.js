import express from 'express'
import { getRepos, getDir, getCode } from '../controllers/proxyController.js'

const router = express.Router()

router.get('/get-repos', getRepos)
router.get('/code', getCode)
router.get('/dir', getDir)

export default router
