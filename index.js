import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import jobsdata from "./routes/jobs_router.js";
import companisedata from "./routes/companise_route.js";
import userRoute from "./routes/users_route.js";
import applicant from "./routes/Application_route.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// import
const app = express();
dotenv.config();
app.use(express.json());
// const allowedOrigins = ["https://jobportalbykrishna.netlify.app","http://localhost:3000",];

app.use(
  cors({
    origin:"https://jobportalbykrishna.netlify.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],

  })
);
app.use(cookieParser());
const URI = process.env.MongodbURI;
const PORT = process.env.PORT || 4001;

const DB = process.env.MongodbAtlasURI;

// conecting mongodb =====================
try {
  const connation = mongoose.connect(DB);
  console.log("mngodb atlas is connected");
} catch (error) {
  console.log(`Mongodb conicting error ;- ${error}`);
}

// file upload config -==================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/public", express.static(path.join(__dirname, "public")));

// Route  Defining -==================
app.use("/jobs", jobsdata);
app.use("/companise", companisedata);
app.use("/user", userRoute);
app.use("/applicant", applicant);

// listrning app hear =================
app.listen(PORT, "0.0.0.0", () => {
  console.log(`app running on localhost:${PORT}`);
});
