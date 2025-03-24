// models/Business.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database.js";
import ApiKey from "./ApiKey.js";
import Widget from "./Widget.js";
import Message from "./Message.js";
import Customer from "./Customer.js";
import Agents from "./Agents.js";
import Session from "./Sessions.js";
import CannedResponse from "./CannedResponse.js";
import Triggers from "./Trigger.js";

interface BusinessAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  domain?: string;
  businessName?: string;
  maxSeats: number;
  subscriptionPlan: string;
  createdAt: Date;
  updatedAt: Date;
}

interface BusinessCreationAttributes
  extends Optional<
    BusinessAttributes,
    "id" | "createdAt" | "updatedAt" | "maxSeats"
  > {}

class Business
  extends Model<BusinessAttributes, BusinessCreationAttributes>
  implements BusinessAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public domain?: string;
  public businessName?: string;
  public maxSeats!: number;
  public subscriptionPlan!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Relationships
  public ApiKeys!: ApiKey[];
  public Widget!: Widget[];
  public Message!: Message[];
  public Customer!: Customer[];
  public Agents!: Agents[];
  public Sessions!: Session[];
  public CannedResponse!: CannedResponse[];
  public Triggers!: Triggers[];
}

Business.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    domain: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    businessName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subscriptionPlan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxSeats: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
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
    modelName: "Business",
  }
);

export default Business;
