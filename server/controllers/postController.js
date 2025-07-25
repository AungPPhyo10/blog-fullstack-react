import PostModel from '../models/postModel.js';
import fs from 'fs';

export const getPosts = async (req,res) => {
    try {
        const posts = await PostModel.find();

        return res.status(200).json(posts);

    } catch (error) {
        return res.status(404).json({message : error.message})
    }
}

export const createPost = async (req,res) => {
    const {originalname, path} = req.file;       // retake the original name of the file

    const parts = originalname.split('.');
    const ext = parts[1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);

    const {title, summary, content} = req.body;
    const postDoc = await PostModel.create({
        title, summary, content, 
        cover: newPath,
    })
    res.status(200).json(postDoc);
}

//      req.file = {
//     "fieldname": "file",
//     "originalname": "8.JPG",
//     "encoding": "7bit",
//     "mimetype": "image/jpeg",
//     "destination": "uploads/",
//     "filename": "fdc3430cb2ee58be81cc9ed1609e209a",
//     "path": "uploads\\fdc3430cb2ee58be81cc9ed1609e209a",
//     "size": 4044621
// }
