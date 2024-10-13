import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(cors())
app.use(morgan("dev"))
app.use(helmet())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI!).then(()=> console.log("connected to database"))

const PORT = 8080;

app.listen(PORT,()=>{
    console.log("Server started on port ",PORT)
})