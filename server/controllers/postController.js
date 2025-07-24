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
    const {originalname, path} = req.file;       // retake the original name of the file
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);

    const {title, summary, content} = req.body;
    // PostModel.create({

    // })

    res.status(200).json({title, content, summary});
    
}
// req.file = {
//     "fieldname": "file",
//     "originalname": "8.JPG",
//     "encoding": "7bit",
//     "mimetype": "image/jpeg",
//     "destination": "uploads/",
//     "filename": "fdc3430cb2ee58be81cc9ed1609e209a",
//     "path": "uploads\\fdc3430cb2ee58be81cc9ed1609e209a",
//     "size": 4044621
// }