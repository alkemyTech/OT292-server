import {Model,InferAttributes,InferCreationAttributes} from 'sequelize'

module.exports = (sequelize:any, DataTypes:any) => {
  class User extends Model <InferAttributes<User>,InferCreationAttributes<User>> {
    declare id:number;
    declare firstName : string;
    declare lastName : string;
    declare email:string;
    declare password:string;
    declare photo:string;
    
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
      allowNull :false
    },
    password: {
       type : DataTypes.STRING,
       allowNull : false,
       validate : {
         min : 6
       }
    },
    photo: {
       type : DataTypes.STRING,
       allowNull : true,
       defaultValue : 'https://thumbs.dreamstime.com/z/icono-de-usuario-predeterminado-vectores-imagen-perfil-avatar-predeterminada-vectorial-medios-sociales-retrato-182347582.jpg'
    },
    
   
  }, {
    sequelize,
    modelName: 'User',
    paranoid : true,
    deletedAt : 'softDelete',
    timestamps : true,
  });
  return User;
};