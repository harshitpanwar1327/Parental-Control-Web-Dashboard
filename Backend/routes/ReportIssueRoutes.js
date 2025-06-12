import express from 'express'
import { insertIssue } from '../controllers/ReportIssueControllers.js'
import multer from 'multer'
import path from 'path'

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/report_issue')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

router.post('/insert-feedback/:parentId', upload.single('screenshot'), insertIssue);

export default router;