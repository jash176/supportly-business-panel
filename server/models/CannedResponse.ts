import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from "../config/database";
import Business from './Business';
interface CannedResponseAttributes {
  id: number;
  businessId: number;
  shortcut: string;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CannedResponseCreationAttributes extends Optional<CannedResponseAttributes, 'id'> {}

class CannedResponse extends Model<CannedResponseAttributes, CannedResponseCreationAttributes> implements CannedResponseAttributes {
  public id!: number;
  public businessId!: number;
  public shortcut!: string;
  public message!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CannedResponse.init(
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
    shortcut: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
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
    tableName: 'CannedResponse',
  }
);

CannedResponse.belongsTo(Business, { foreignKey: "businessId", as: "Business" });

export default CannedResponse;