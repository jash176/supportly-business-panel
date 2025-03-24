// models/Customer.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Business from "./Business";

interface CustomerAttributes {
  id: number;
  businessId: number;
  name?: string;
  email?: string;
  userAgent: string;
  referrer: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CustomerCreationAttributes
  extends Optional<
    CustomerAttributes,
    "id" | "name" | "email" | "createdAt" | "updatedAt"
  > {}

class Customer
  extends Model<CustomerAttributes, CustomerCreationAttributes>
  implements CustomerAttributes
{
  public id!: number;
  public businessId!: number;
  public name?: string;
  public email?: string;
  public userAgent!: string;
  public referrer!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Relationship
  public Business!: Business;
}

Customer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    businessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userAgent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    referrer: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: "Customer",
  }
);

Customer.belongsTo(Business, { foreignKey: "businessId", as: "Business" });

export default Customer;
