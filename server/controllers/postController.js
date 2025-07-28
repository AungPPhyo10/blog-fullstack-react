import PostModel from '../models/postModel.js';
import UserModel from '../models/authModel.js';

import jwt from 'jsonwebtoken';
import fs from 'fs';
const secret = 'secret_key';

export const getPosts = async (req,res) => {
    try {
        // fetch the posts data along with the user's info
        const posts = await PostModel.find()
            .populate('author', 'username')
            .sort({createdAt: -1})
            .limit(20)

        return res.status(200).json(posts);

    } catch (error) {
        return res.status(404).json({message : error.message})
    }
}

export const createPost = async (req,res) => {
    const {originalname, path} = req.file;       // retake the original name of the file
    const {token} = req.cookies;

    const parts = originalname.split('.');
    const ext = parts[1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);

    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) return res.status(403).json({ message: 'Token invalid.' });

        const {title, summary, content} = req.body;
            const postDoc = await PostModel.create({
                title, 
                summary, 
                content, 
                cover: newPath,
                author: info.id
        })

        res.status(200).json(postDoc);
    }) 
    
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
