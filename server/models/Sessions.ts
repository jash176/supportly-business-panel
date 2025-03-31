// models/Session.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Business from "./Business";
import Agents from "./Agents";

interface SessionAttributes {
  id: number;
  businessId: number;
  customerEmail: string | null;
  sid: string; // Used for anonymous users
  assignedAgentId: number | null;
  isResolved: boolean; // Whether the chat is resolved or not
  createdAt: Date;

  // Geolocation information
  geolocationCountry: string | null;
  geolocationRegion: string | null;
  geolocationCity: string | null;
  geolocationLatitude: number | null;
  geolocationLongitude: number | null;
  geolocationCountryCode: string | null; // Optional country code

  // System and browser information
  osVersion: string | null;
  osName: string | null;
  engineName: string | null;
  engineVersion: string | null;
  browserName: string | null;
  browserVersion: string | null;
  userAgent: string | null;
}

interface SessionCreationAttributes
  extends Optional<
    SessionAttributes,
    | "id"
    | "assignedAgentId"
    | "isResolved"
    | "createdAt"
    | "geolocationCountry"
    | "geolocationRegion"
    | "geolocationCity"
    | "geolocationLatitude"
    | "geolocationLongitude"
    | "geolocationCountryCode"
    | "osName"
    | "engineName"
    | "engineVersion"
    | "browserName"
    | "browserVersion"
    | "userAgent"
  > {}

class Session
  extends Model<SessionAttributes, SessionCreationAttributes>
  implements SessionAttributes
{
  public id!: number;
  public businessId!: number;
  public customerEmail!: string | null;
  public sid!: string;
  public assignedAgentId!: number | null;
  public geolocationCountry!: string | null;
  public geolocationRegion!: string | null;
  public geolocationCity!: string | null;
  public geolocationLatitude!: number | null;
  public geolocationLongitude!: number | null;
  public geolocationCountryCode!: string | null; // Optional country code
  public osName!: string | null;
  public osVersion!: string | null;
  public engineName!: string | null;
  public engineVersion!: string | null;
  public browserName!: string | null;
  public browserVersion!: string | null;
  public userAgent!: string | null;
  public isResolved!: boolean;
  public readonly createdAt!: Date;

  // Relationships
  public Business!: Business;
}

// Initialize the model
Session.init(
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
    customerEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sid: {
      type: DataTypes.STRING,
      allowNull: false, // For users without an email
    },
    assignedAgentId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Can be null if not assigned
    },
    isResolved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // By default, session is active
    },
    geolocationCountry: {
      type: DataTypes.STRING,
      allowNull: true, // This can be null if no geolocation is provided
    },
    geolocationRegion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    geolocationCity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    geolocationLatitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    geolocationLongitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    geolocationCountryCode: {
      type: DataTypes.STRING,
      allowNull: true, // Optional country code
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    // System and browser columns
    osVersion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    osName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    engineName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    engineVersion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    browserName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    browserVersion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userAgent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Session",
  }
);

// Define relationships
Session.belongsTo(Business, { foreignKey: "businessId", as: "Business" });
Session.belongsTo(Agents, {
  foreignKey: "assignedAgentId",
  as: "AssignedAgent",
});

export default Session;
