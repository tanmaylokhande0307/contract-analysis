import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import "./config/passport";

import authRoutes from "./routes/auth";
import contractRoutes from "./routes/contracts";

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI!,
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => console.log("connected to database"));

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/contracts", contractRoutes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log("Server started on port ", PORT);
});
