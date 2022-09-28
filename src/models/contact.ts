import {
  Model, InferAttributes, InferCreationAttributes, CreationOptional, Sequelize, DataTypes as types,
} from 'sequelize';

export class Contact extends Model <InferAttributes<Contact>, InferCreationAttributes<Contact>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare phone: number;
  declare email: string;
  declare message: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: Date | null;
}

export default function initContactModel(sequelize: Sequelize, DataTypes: typeof types) {
  Contact.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Contact',
    tableName: 'Contacts',
    paranoid: true,
    timestamps: true,
    underscored: true,
  });
  return Contact;
}
