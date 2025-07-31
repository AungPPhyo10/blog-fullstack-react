import PostModel from '../models/postModel.js';

import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
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

export const getSinglePost = async (req,res) => {
    const id = req.params.id;

    try {
        // fetch a single post data along with the user's info
        const post = await PostModel.findById(id)
            .populate('author', 'username')

        return res.status(200).json(post);

    } catch (error) {
        return res.status(404).json({message : error.message})
    }
}

export const createPost = async (req,res) => {
    const {token} = req.cookies;
    const {title, summary, content} = req.body;

    if (!req.file || req.file == null) {
        return res.status(404).json({message: "The image was not uploaded properly"})
    } else if (!req.body.title || !req.body.summary || !req.body.content) {
        return res.status(404).json({message: "No content of the blog detected"})
    }

    const {originalname, path} = req.file;       // retake the original name of the file
    const parts = originalname.split('.');
    const ext = parts[1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);       // blocking function, needs to be inside async function 

    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) return res.status(403).json({ message: 'Token invalid.' });

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

export const updatePost = async (req,res) => {
    const id = req.params.id;
    const {token} = req.cookies;
    
    if (!req.file || req.file == null) {
        return res.status(400).json({message: "The image was not uploaded properly"})
    } else if (!req.body.title || !req.body.summary || !req.body.content) {
        return res.status(400).json({message: "No content of the blog detected"})
    }

    const post = await PostModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Delete old cover image
    if (post.cover) {
      const oldImagePath = path.resolve(post.cover);    // Convert to absolute path
      fs.unlink(oldImagePath, (err) => {
        if (err) console.error("Failed to delete old image:", err);
      });
    }

    const { originalname, path: tempPath } = req.file;      // retake the origianl name of the file
    const ext = originalname.split('.').pop();
    const newPath = tempPath + '.' + ext;
    fs.renameSync(tempPath, newPath);       // blocking function, needs to be inside async function 

    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) return res.status(403).json({ message: 'Token invalid.' });

        const {title, summary, content} = req.body;

        const postDoc = await PostModel.updateOne({_id:id} , {
            title, 
            summary, 
            content, 
            cover: newPath,
            author: info.id
        })

        res.status(200).json(postDoc);
    })    
}

export const deletePost = async (req,res) => {
    const id = req.params.id;

    const post = await PostModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    if (post.cover) {
      const imagePath = path.resolve(post.cover);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Failed to delete old image:", err);
      });
    }

    try {
        await PostModel.deleteOne({_id:id})

        return res.status(200).json({message: "Post successfully deleted!"});
        
    } catch (error) {
        return res.status(404).json({message : error.message})
    }
}