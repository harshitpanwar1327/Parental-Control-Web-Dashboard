import express from 'express'
import { getChildren, insertChild, getChild, updateChild, deleteChild } from '../controllers/ChildrenControllers.js'
import path from 'path'
import multer from 'multer'

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/profiles')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

router.get('/get-children', getChildren);
router.post('/insert-child', upload.single('imageFileName'), insertChild);
router.get('/get-child/:childId', getChild);
router.put('/update-child/:childId', upload.single('imageFileName'), updateChild);
router.delete('/delete-child/:childId', deleteChild);

export default router;