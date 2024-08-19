import express from "express";

const app = express();
app.use(express.json());

app.get("/api", (req, res) => {
  res.send({
    message: "Hello",
  });
});

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Listening on port", PORT);
    
})