import express from "express";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const mongoUri = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/octofit";

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB on", mongoUri);
    app.listen(port, () => {
      console.log(`OctoFit backend listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
