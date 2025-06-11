import express from 'express'
import {registerDevice, manageDevices, getDevices, updateDevice} from '../controllers/DevicesControllers.js'
import AuthMiddleware from '../middlewares/AuthMiddleware.js'

const router = express.Router();

router.post('/register-device', registerDevice);

router.use(AuthMiddleware);

router.post('/manage-devices/', manageDevices);
router.put('/update-child/', updateDevice);
router.get('/get-devices/:license', getDevices);

export default router;