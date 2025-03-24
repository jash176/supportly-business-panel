import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.JWT_SECRET as string;

export const generateToken = (data: {
  id: number;
  name: string;
  email: string;
  userType: "owner" | "agent"
}) => {
  return jwt.sign(data, secret, { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret);
};
