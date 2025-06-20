import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import connectDB from './database/index.js';
import userRoutes from './routes/userRoutes.js';
import auctionRoutes from './routes/auctionRoutes.js';
const app= express();
config({
    path: "./config/config.env"
})

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auction", auctionRoutes);
connectDB();

export default app;