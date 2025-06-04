import express from 'express'
import { insertFeedback } from '../controllers/FeedbackControllers.js'

const router = express.Router();

router.post('/insert-feedback/:parentId', insertFeedback);

export default router;