import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from "../config/database";
import Business from './Business';

export interface Condition {
  type: "on_leave_intent" | "on_click_link" | "on_page" | "after_delay";
  value?: string | number; // URL for `on_click_link`, Page URL for `on_page`, Seconds for `after_delay`
}

interface TriggerAttributes {
  id: number;
  businessId: number;
  name: string;
  identifier: string;
  action: "show_message" | "open_chatbox";
  message?: string;
  conditions: Condition[]; // Now an array of objects
  delayTime?: number | null; // In seconds, optional
  onlyIfOnline: boolean;
  executeOnce: boolean;
  createdAt: Date;
}

interface TriggerCreationAttributes extends Optional<TriggerAttributes, 'id' | "createdAt"> {}

class Triggers extends Model<TriggerAttributes, TriggerCreationAttributes> implements TriggerAttributes {
  public id!: number;
  public businessId!: number;
  public name!: string;
  public identifier!: string;
  public action!: "show_message" | "open_chatbox";
  public message?: string;
  public conditions!: Condition[];
  public onlyIfOnline!: boolean;
  public delayTime?: number | null;
  public executeOnce!: boolean;
  public readonly createdAt!: Date;
}

Triggers.init(
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
      allowNull: false,
    },
    identifier: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    action: {
      type: DataTypes.ENUM("show_message", "open_chatbox"),
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true, // Only needed for "show_message"
    },
    conditions: {
      type: DataTypes.JSON, // Store conditions as array of objects
      allowNull: false,
    },
    onlyIfOnline: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    executeOnce: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    delayTime: {
      type: DataTypes.INTEGER,
      allowNull: true, // Optional delay in seconds
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Trigger",
  }
);

Triggers.belongsTo(Business, { foreignKey: "businessId", as: "Business" });

export default Triggers;