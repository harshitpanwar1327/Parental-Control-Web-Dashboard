import express from 'express'
import { getSettings, updateSettings } from '../controllers/SettingsControllers.js'

const router = express.Router();

router.get('/get-settings/:parentId', getSettings);
router.put('/update-settings/:parentId', updateSettings);

export default router;