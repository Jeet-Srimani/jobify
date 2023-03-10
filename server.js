import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import morgan from "morgan";
// import cors from "cors";

//PRODUCTION READY *****************
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from "cookie-parser";


dotenv.config();
const app = express();

// db and auth
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";
import connectDB from "./db/connect.js";
//middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

//PRODUCTION READY *******************
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/build")));

// app.use(cors());
app.use(express.json());
app.use(cookieParser());

//PRODUCTION READY
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

// app.get("/api/v1", (req, res) => {
//   res.json({ msg: "welcome" });
// });

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

//PRODUCTION READY **********************
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

start();
