import express from 'express'
import {registerDevice, getDevices, updateDevice} from '../controllers/DevicesControllers.js'
import AuthMiddleware from '../middlewares/AuthMiddleware.js'

const router = express.Router();

router.post('/register-device', registerDevice);

router.use(AuthMiddleware);

router.get('/get-devices/:license', getDevices);
router.put('/update-child/:id', updateDevice);

export default router;