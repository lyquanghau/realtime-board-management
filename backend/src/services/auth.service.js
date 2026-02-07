import { db } from "../config/firebase.js";
import { sendEmail } from "./mailer.service.js";
import jwt from "jsonwebtoken";

export const signupWithEmail = async (email) => {
  if (!email) {
    throw new Error("Email is required");
  }

  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  const now = Date.now();
  const codeExpiresAt = new Date(now + 5 * 60 * 1000);

  await db.collection("users").add({
    email,
    verificationCode,
    codeExpiresAt,
    createdAt: new Date(),
  });

  await sendEmail(
    email,
    "Your verification code",
    `Your verification code is: ${verificationCode}\nThis code will expire in 5 minutes.`
  );

  return true;
};

export const verifyCode = async (email, code) => {
  if (!email || !code) {
    throw new Error("Email and code are required");
  }

  const snap = await db
    .collection("users")
    .where("email", "==", email)
    .orderBy("createdAt", "desc")
    .limit(1)
    .get();

  if (snap.empty) {
    throw new Error("User not found");
  }

  const doc = snap.docs[0];
  const data = doc.data();

  if (data.verificationCode !== code) {
    throw new Error("Invalid verification code");
  }

  if (data.codeExpiresAt.toDate() < new Date()) {
    throw new Error("Verification code expired");
  }

  await doc.ref.update({
    isVerified: true,
    verifiedAt: new Date(),
  });

  const token = jwt.sign({ userId: doc.id, email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return token;
};
