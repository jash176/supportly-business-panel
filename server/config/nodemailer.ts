import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail", // service name or provider e.g., gmail, yahoo, etc.
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendMail = async (options: {
  to: string;
  subject: string;
  html: string;
}) => {
  try {
    const mailOptions = {
      from:
        process.env.SMTP_FROM || "Your Company Name <noreply@yourcompany.com>",
      ...options,
    };
  
    return transporter.sendMail(mailOptions);
  }catch(error){
    console.log("Email send error : ", error)
  }
};

// Verify connection configuration
transporter.verify((error) => {
  if (error) {
    console.log("Error with email service: ", error);
  } else {
    console.log("Email server is ready to take our messages");
  }
});

export default transporter;
