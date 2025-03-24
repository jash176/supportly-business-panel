import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { logger } from "../utils";
dotenv.config();
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: "mysql", // or 'postgres', 'sqlite', etc.
  logging: false, // Disable logging if not required
});

export const connectDb = () => {
  try {
    sequelize.sync({ alter: true, force: true }); // Creates tables if they don't exist
  } catch (error) {
    logger.log("Connection DB Error : ", error);
  }
};

export default sequelize;
