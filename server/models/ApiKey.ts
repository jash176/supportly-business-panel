// models/ApiKey.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Business from './Business';

interface ApiKeyAttributes {
  id: number;
  businessId: number;
  key: string;
  createdAt?: Date;
  lastUsedAt?: Date;
}

interface ApiKeyCreationAttributes extends Optional<ApiKeyAttributes, 'id' | 'lastUsedAt'> {}

class ApiKey extends Model<ApiKeyAttributes, ApiKeyCreationAttributes> implements ApiKeyAttributes {
  public id!: number;
  public businessId!: number;
  public key!: string;
  public readonly createdAt!: Date;
  public lastUsedAt?: Date;

  // Relationship
  public Business!: Business;
}

ApiKey.init(
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
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    lastUsedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'ApiKey',
  }
);

ApiKey.belongsTo(Business, { foreignKey: 'businessId', as: 'Business' });

export default ApiKey;
