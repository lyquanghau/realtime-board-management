import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import boardRoutes from "./routes/board.route.js";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/boards", boardRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
