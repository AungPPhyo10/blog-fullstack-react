import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserModel from '../models/authModel.js';

const salt = bcrypt.genSaltSync(10);
const secret = 'secret_key';

export const registerUser = async (req,res) => {
    const {username, password, repassword} = req.body;

    if (!username || !password || !repassword) {
        return res.status(400).json({message: 'Please provide username and password'})
    } else if (password.length < 5) {
        return res.status(404).json({message: 'Password too short. Minimum 5 characters'})
    } else if (password != repassword) {
        return res.status(400).json({message: 'Passwords do not match'})
    }

    try {
        // create a user model record in mongoose schema
        const userDoc = await UserModel.create({
            username,
            password: bcrypt.hashSync(password, salt)
        });
        return res.status(200).json(userDoc);
    } catch (error) {
        return res.status({message: error.message});
    }

}

export const loginUser = async (req,res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({message: 'Please provide username and password'})
    }

    try {
        // search for one record only in mongoose schema
        const userDoc = await UserModel.findOne({username : username});

        if (!userDoc) {
            return res.status(404).json({ message: 'User not found!' });
        }

        const passwordOk = bcrypt.compareSync(password, userDoc.password);

        if (passwordOk) {
            // callback function with the signed token
            jwt.sign({username, id: userDoc._id}, secret, {}, (err, token) => {
                if (err) throw err;

                // send the token as response inside the cookie, httpOnly cookie with a 6 hour expiry time
                res.cookie('token', token, {
                    httpOnly: true,
                    sameSite: 'strict',
                    maxAge: 6*60*60*1000
                }).json({
                    id: userDoc._id,
                    username,
                });
            })
        } else {
            return res.status(403).json({message : 'Wrong password!'})
        }
        
    } catch (error) {
        return res.status(500).json({message: error.message});
    }

}

export const userProfile = async (req,res) => {
    const {token} = req.cookies;
    if (!token) 
        return res.status(401).json({ message: 'No token found' });

    jwt.verify(token, secret, {}, (err, info) => {
        if (err) return res.status(403).json({ message: 'Token invalid' });

        return res.status(200).json(info);
    })

}

export const logout = async (req,res) => {
    res.clearCookie('token');
    res.json('ok');

}