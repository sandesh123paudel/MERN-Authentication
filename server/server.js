import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = ["http://localhost:5173"];
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: allowedOrigins }));

//API Endpoints
app.get("/", (req, res) => {
  res.send("API Working");
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

if (connectDB()) {
  app.listen(port, () =>
    console.log(`Server running on http://localhost:${port}`)
  );
}
