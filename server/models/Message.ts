// models/Message.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Business from "./Business";
import Agents from "./Agents";
import Session from "./Sessions";

interface MessageAttributes {
  id: number;
  businessId: number;
  customerEmail: string | null;
  sessionId: number;
  sender: string;
  senderId: number | null;
  contentType: string;
  content?: string;
  timestamp: Date;
  isRead: boolean;
}

interface MessageCreationAttributes
  extends Optional<
    MessageAttributes,
    "id" | "content" | "timestamp" | "isRead"
  > {}

class Message
  extends Model<MessageAttributes, MessageCreationAttributes>
  implements MessageAttributes
{
  public id!: number;
  public businessId!: number;
  public customerEmail!: string | null;
  public sessionId!: number;
  public sender!: string;
  public senderId!: number | null;
  public contentType!: string;
  public content?: string;
  public readonly timestamp!: Date;
  public isRead!: boolean;

  // Relationship
  public Business!: Business;
  public Session!: Session;
}

Message.init(
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
    sessionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sender: {
      type: DataTypes.STRING,
      defaultValue: "customer",
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: true, // This will store either the Business or Agent ID
    },
    contentType: {
      type: DataTypes.STRING,
      defaultValue: "text",
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Message",
  }
);

Message.belongsTo(Business, { foreignKey: "businessId", as: "Business" });
Message.belongsTo(Business, { foreignKey: "senderId", as: "BusinessSender" });
Message.belongsTo(Agents, { foreignKey: "senderId", as: "AgentSender" });
Message.belongsTo(Session, { foreignKey: "sessionId", as: "Session" });
export default Message;
