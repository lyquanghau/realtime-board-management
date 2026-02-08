import dotenv from "dotenv";
dotenv.config();

import sgMail from "@sendgrid/mail";

console.log("📨 SENDGRID MAILER LOADED");

console.log("ENV CHECK (mailer):", {
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY ? "LOADED" : "MISSING",
  MAIL_FROM: process.env.MAIL_FROM,
});

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("❌ SENDGRID_API_KEY is missing");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async (to, subject, text) => {
  console.log("📨 sendEmail CALLED (SendGrid)");

  const msg = {
    to,
    from: process.env.MAIL_FROM,
    subject,
    text,
  };

  try {
    await sgMail.send(msg);
    console.log("✅ EMAIL SENT VIA SENDGRID");
  } catch (error) {
    console.error("❌ SENDGRID SEND FAILED");
    console.error(error.response?.body || error);
    throw error;
  }
};
