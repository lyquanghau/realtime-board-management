import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/me", verifyJWT, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

export default router;
