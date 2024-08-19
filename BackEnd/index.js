import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./Routes/user.route.js ";
import authRouter from "./Routes/auth.route.js";

const app = express();
app.use(express.json());
dotenv.config();

app.use("/api/user", router);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = req.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).send({
    error: true,
    message,
  });
});

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO).then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
