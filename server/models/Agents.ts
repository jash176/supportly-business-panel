// models/Business.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database.js";
import Business from "./Business.js";

interface AgentsAttributes {
  id: number;
  businessId: number;
  name: string;
  email: string;
  password: string;
  role?: string;
  createdAt: Date;
  updatedAt: Date;
  avatar?: string;
}

interface BusinessCreationAttributes
  extends Optional<AgentsAttributes, "id" | "createdAt" | "updatedAt"> {}

class Agents
  extends Model<AgentsAttributes, BusinessCreationAttributes>
  implements AgentsAttributes
{
  public id!: number;
  public name!: string;
  public businessId!: number;
  public email!: string;
  public password!: string;
  public role!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Relationships
  public Business!: Business;
}

Agents.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    businessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Businesses",
        key: "id",
      },
      onDelete: "CASCADE", // Delete agents if the business is deleted
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("owner", "agent"), // 'owner' for main account, 'agent' for seats
      defaultValue: "agent",
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: "CURRENT_TIMESTAMP",
    },
  },
  {
    sequelize,
    modelName: "Agents",
  }
);
Business.hasMany(Agents, { foreignKey: "businessId", as: "Agents" });
Agents.belongsTo(Business, { foreignKey: "businessId", as: "Business" });

export default Agents;
