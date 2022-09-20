import {Model,InferAttributes,InferCreationAttributes, CreateOptions,CreationOptional} from 'sequelize'

module.exports = (sequelize:any, DataTypes:any) => {
  class User extends Model <InferAttributes<User>,InferCreationAttributes<User>> {
    declare id:CreateOptions<number>;
    declare firstName : string;
    declare lastName : string;
    declare email:string;
    declare password:string;
    declare photo:null|string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    
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
    createdAt:{
        type : DataTypes.DATE,
        defaultValue : Date.now()
    },
    
    updatedAt: {
     type: DataTypes.DATE,
     defaultValue : Date.now()
    } 
    
   
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