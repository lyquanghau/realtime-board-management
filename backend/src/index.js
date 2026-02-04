import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { db } from "./config/firebase.js";
import { sendEmail } from "./services/mailer.service.js";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
