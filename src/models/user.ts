import {Model,InferAttributes,InferCreationAttributes, CreateOptions} from 'sequelize'

module.exports = (sequelize:any, DataTypes:any) => {
  class User extends Model <InferAttributes<User>,InferCreationAttributes<User>> {
    declare id:CreateOptions<number>;
    declare firstName : string;
    declare lastName : string;
    declare email:string;
    declare password:string;
    declare photo:null|string;
    
    static associate(models:any) {
       User.belongsTo(models.Role);
    }
  }
  User.init({
     id : {
       type : DataTypes.INTEGER,
       autoIncrement : true,
       primaryKey :true,
       allowNull : false
     },
    firstName: {
       type : DataTypes.STRING,
       allowNull : false
    },
    lastName:{
      type : DataTypes.STRING,
      allowNull : false
    },
    email: {
      type : DataTypes.STRING,
      allowNull :false,
      unique : true
    },
    password: {
       type : DataTypes.STRING,
       allowNull : false,
      
    },
    photo: {
       type : DataTypes.STRING,
       allowNull : true,
       
    },
    
   
  }, {
    sequelize,
    modelName: 'User',
    paranoid : true,
    deletedAt :true,
    underscored : true,
    timestamps : true,
  });
  return User;
};