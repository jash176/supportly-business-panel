// models/Widget.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Business from './Business';
import Trigger from './Trigger';

interface WidgetAttributes {
  id: number;
  businessId: number;
  colorScheme: string;
  position: string;
  welcomeMessage: string;
  avatarUrl?: string;
  createdAt?: Date;
  updatedAt: Date;
}

interface WidgetCreationAttributes extends Optional<
  WidgetAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'colorScheme' | 'position' | 'welcomeMessage'
> {}

class Widget extends Model<WidgetAttributes, WidgetCreationAttributes> implements WidgetAttributes {
  public id!: number;
  public businessId!: number;
  public colorScheme!: string;
  public position!: string;
  public welcomeMessage!: string;
  public avatarUrl?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Relationships
  public Triggers!: Trigger[];
  public Business!: Business;
}

Widget.init(
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
    colorScheme: {
      type: DataTypes.STRING,
      defaultValue: '#000000',
    },
    position: {
      type: DataTypes.STRING,
      defaultValue: 'bottom-right',
    },
    welcomeMessage: {
      type: DataTypes.STRING,
      defaultValue: 'Hi there! How can we help you?',
    },
    avatarUrl: {
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
      onUpdate: 'CURRENT_TIMESTAMP',
    },
  },
  {
    sequelize,
    modelName: 'Widget',
  }
);

Widget.belongsTo(Business, { foreignKey: 'businessId', as: 'Business' });

export default Widget;
