import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
dotenv.config();

app.get("/api", (req, res) => {
  res.send({
    message: "Hello",
  });
});

const PORT = process.env.PORT || 3000

mongoose.connect(
  process.env.MONGO
).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
