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