import {Users} from '../models/UsersModels.js'
import {registerUserLogic, loginUserLogic} from '../services/UsersServices.js'

export const registerUser = async (req, res) => {
    let {name, email, password} = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({success: false, message: "All fields are required!"});
    }

    let userData = new Users({name, email, password});

    try {
        const response = await registerUserLogic(userData);
        if(response.success) {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response);
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({success: false, message: "Unable to register user! Please try again!"})
    }
}

export const loginUser = async (req, res) => {
    let {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({success: false, message: "All fields are required!"});
    }

    let userData = new Users({email, password});

    try {
        const response = await loginUserLogic(userData);
        if(response.success) {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response);
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({success: false, message: "Unable to login user! Please try again!"})
    }
}