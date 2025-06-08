import express from 'express'
import {registerUser, loginUser, getLicense} from '../controllers/UsersControllers.js'

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/get-license/:parentId', getLicense);

export default router;