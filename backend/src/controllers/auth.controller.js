import { signupWithEmail } from "../services/auth.service.js";

export const signup = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    await signupWithEmail(email);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

import { verifyCode } from "../services/auth.service.js";

export const verify = async (req, res) => {
  try {
    const { email, code } = req.body;
    const token = await verifyCode(email, code);
    res.json({ success: true, token });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
