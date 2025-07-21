import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';        // for image uploads

const app = express(); 

// define path for file uploads
const upload = multer({dest: 'uploads/'}); 

// ===== ESSENTIAL FOR SHARING THE API with cors policy ========
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));

// ===== INITIALIZE THE APP ========
app.use(express.json());

// ===== ADD COOKIE PARSER TO PARSE BACK SESSION COOKIES ======
app.use(cookieParser());

// https://www.mongodb.com/cloud/atlas
const CONNECTION_URL = 'mongodb+srv://aungphyoe9190:AungPP1010@cluster-mongo.ceetcw3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-Mongo' 
const PORT = process.env.PORT || 3000;

mongoose.connect(CONNECTION_URL)
    .then(() => 
        app.listen(PORT, () => 
            console.log(`Server running on port ${PORT}. Check the URL at http://localhost:3000`)
        )
        // successful connection, show console message
    )
    .catch((error) => 
        console.log(error.message)
    )

import mainRoutes from './routes/mainRoutes.js';
app.use('/api', mainRoutes);


