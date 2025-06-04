import express from 'express'
import { getActivities, insertActivities } from '../controllers/ActivitiesControllers.js'

const router = express.Router();

router.get('/get-activities/:childId', getActivities);
router.post('/insert-activities/:childId', insertActivities);

export default router;