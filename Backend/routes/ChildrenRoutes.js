import express from 'express'
import { getChildren, insertChild, getChild, updateChild, deleteChild } from '../controllers/ChildrenControllers.js'

const router = express.Router();

router.get('/get-children', getChildren);
router.post('/insert-child', insertChild);
router.get('/get-child/:childId', getChild);
router.put('/update-child/:childId', updateChild);
router.delete('/delete-child/:childId', deleteChild);

export default router;