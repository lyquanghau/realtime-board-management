import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./config/firebase.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.get("/health", (req, res) => {
  res.json({ status: "okkkkkkk" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
