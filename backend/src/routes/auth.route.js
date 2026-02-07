import express from "express";
import { signupWithEmail } from "../services/auth.service.js";
import { verify } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { email } = req.body;
    await signupWithEmail(email);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/verify", verify);

export default router;
