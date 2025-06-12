import {ChildrenModels} from '../models/ChildrenModels.js'
import { getChildrenLogic, insertChildLogic, getChildLogic, updateChildLogic, deleteChildLogic } from '../services/ChildrenServices.js'

export const getChildren = async (req, res) => {
    try {
        let response = await getChildrenLogic();
        if(response.success) {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

export const insertChild = async (req, res) => {
    const {parentId, name, age} = req.body;
    const imageFileName = req.file?.filename;

    if(!parentId || !name) {
        return res.status(400).json({success: false, message: "Fill all the required fields!"})
    }

    let childrenData = new ChildrenModels({parentId, name, age, imageFileName});

    try {
        let response = await insertChildLogic(childrenData);
        if(response.success) {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

export const getChild = async (req, res) => {
    const {childId} = req.params;

    if(!childId) return res.status(400).json({success: false, message: "ChildId cannot be undefined!"});
 
    try {
        let response = await getChildLogic(childId);
        if(response.success) {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

export const updateChild = async (req, res) => {
    const {childId} = req.params;
    const {parentId, name, age} = req.body;
    const imageFileName = req.file.filename;

    if(!childId) return res.status(400).json({success: false, message: "ChildId cannot be undefined!"});

    if(!parentId || !name) {
        return res.status(400).json({success: false, message: "Fill all the required fields!"})
    }

    let childrenData = new ChildrenModels({parentId, name, age, imageFileName});

    try {
        let response = await updateChildLogic(childId, childrenData);
        if(response.success) {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

export const deleteChild = async (req, res) => {
    const {childId} = req.params;

    if(!childId) return res.status(400).json({success: false, message: "ChildId cannot be undefined!"});

    try {
        let response = await deleteChildLogic(childId);
        if(response.success) {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error"});
    }
}