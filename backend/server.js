import express from 'express'
import dotenv from "dotenv"
import connectDB from './db/connectDB.js'
import cookieParser from 'cookie-parser'
import userRoutes from "./Routes/userRoutes.js"
import postRoutes from "./Routes/postRoutes.js"
import {v2 as cloudinary} from "cloudinary"
import fileUpload from 'express-fileupload';

dotenv.config()
connectDB()
const app= express()
const PORT= process.env.PORT || 5000

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({limit: '50mb',extended:true}));
app.use(cookieParser());
app.use(fileUpload());


//routes
app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)
app.listen(PORT, ()=>{
    console.log(`Server started at ${PORT}`)
})