// models/Session.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Business from "./Business";
import Agents from "./Agents";

interface SessionCreationAttributes
  extends Optional<
    SessionAttributes,
    | "id"
    | "name"
    | "assignedAgentId"
    | "isResolved"
    | "createdAt"
    | "notes"
    | "segments"
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
    | "lastActive"
    | "ratings"
  > {}

class Session
  extends Model<SessionAttributes, SessionCreationAttributes>
  implements SessionAttributes
{
  public id!: number;
  public businessId!: number;
  public name!: string;
  public customerEmail!: string | null;
  public sid!: string;
  public assignedAgentId!: number | null;
  public notes!: string | null;
  public segments!: string[];
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
  public lastActive!: Date | null;
  public ratings!: number | null;
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
    name: {
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
    notes: {
      type: DataTypes.TEXT,
      allowNull: true, // Optional notes about the session
      defaultValue: "",
    },
    segments: {
      type: DataTypes.JSON, // Using JSON type to store array of strings
      defaultValue: [], // Default to empty array
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
    lastActive: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    ratings: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5,
      },
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
