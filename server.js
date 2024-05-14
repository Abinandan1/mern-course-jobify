import "express-async-errors";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import jobRouter from "./routers/jobRouter.js";
import userRouter from "./routers/userRouter.js";
import authRouter from "./routers/authRouter.js";
import mongoose from "mongoose";
import { errorHandlerMiddleware } from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import cloudinary from "cloudinary";

dotenv.config();
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// MIDDLEWARE
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());

// ROUTER
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateUser, userRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

// NOT FOUND
app.use("*", (req, res) => {
  res.status(404).json({ msg: "Not found" });
});

// ERROR HANDLER
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

try {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
