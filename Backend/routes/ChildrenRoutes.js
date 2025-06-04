import express from 'express'
import { getChildren, insertChild, getChild, updateChild, deleteChild } from '../controllers/ChildrenControllers.js'

const router = express.Router();

router.get('/get-children', getChildren);
router.post('/insert-child', insertChild);
router.get('/get-child/:id', getChild);
router.put('/update-child/:id', updateChild);
router.delete('/delete-child/:id', deleteChild);

export default router;