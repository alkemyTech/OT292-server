
import {
  CreationOptional, DataTypes as types, InferAttributes, InferCreationAttributes, Model, Sequelize,
} from 'sequelize';

  export class Testimonials extends Model<InferAttributes<Testimonials>, InferCreationAttributes<Testimonials>> {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    declare id: CreationOptional<Number>;
    declare name:string;
    declare image:string;
    declare content:string;

    declare createdAt: CreationOptional<Date>| null;
    declare updatedAt: CreationOptional<Date>| null;
  

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
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Testimonial',
    tableName: 'Testimonials',
    underscored: true,
    paranoid: true,
  });

  return Testimonials
  }

