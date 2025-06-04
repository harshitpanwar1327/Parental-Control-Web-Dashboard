import express from 'express'
import { getControl, updateControl } from '../controllers/ControlsControllers.js'

const router = express.Router();

router.get('/get-control/:childId', getControl);
router.post('/update-control/:childId', updateControl);

export default router;