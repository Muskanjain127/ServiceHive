import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectdb } from "./config/db";
import cookieParser from "cookie-parser";
import adminrouter from "./routes/admin";
import userrouter from "./routes/user";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "UPDATE"],
  }),
);
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 5000;
connectdb();
app.use("/", userrouter);
app.use("/admin", adminrouter);
app.listen(PORT, () => {
  console.log(`app is running at port ${PORT}`);
});
