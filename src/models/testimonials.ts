import {
  CreationOptional, DataTypes as types, ForeignKey, InferAttributes,
  InferCreationAttributes, Model, Sequelize,
} from 'sequelize';

export class Testimonials extends Model<InferAttributes<Testimonials>, InferCreationAttributes<Testimonials>> {
  declare id: CreationOptional<Number>;
  declare name:string;
  declare image:string;
  declare content:string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: Date | null;
}
export default function initTestimonialModel(sequelize: Sequelize, DataTypes: typeof types) {
  Testimonials.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },

    image: DataTypes.STRING,
    content: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

  }, {
    sequelize,
    modelName: 'Testimonial',
    tableName: 'Testimonials',
    timestamps: true,
    paranoid: true,
    underscored: true,
  });

  return Testimonials;
}
