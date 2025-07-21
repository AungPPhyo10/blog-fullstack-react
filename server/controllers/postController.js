import PostModel from '../models/postModel.js';
import fs from 'fs';

export const getPosts = async (req,res) => {
    try {
        const postMessages = await PostModel.find();

        return res.status(200).json(postMessages);

    } catch (error) {
        return res.status(404).json({message : error.message})
    }
}

export const createPost = async (req,res) => {
    const {originalname} = req.file;       // retake the original name of the file
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
    

    res.json({ext});
}
