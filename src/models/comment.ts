import {
    CreationOptional, DataTypes as types, ForeignKey, InferAttributes,
    InferCreationAttributes, Model, Sequelize,
  } from 'sequelize';
  import {News } from './news';
  import {User} from './user';

  export class Comment extends Model <InferAttributes<Comment>,InferCreationAttributes<Comment>> {
    declare id: CreationOptional<Number>;
    declare user_id: ForeignKey<User>;
    declare new_id:ForeignKey<News>;
    declare content: string;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare deletedAt: Date | null;
    declare type: string;

    static associate(models: any) {
        Comment.belongsTo(models.Users);
        Comment.belongsTo(models.news);
    }

  }

  export default function initCommentModel(sequelize: Sequelize, DataTypes: typeof types) {
    Comment.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        }},
      new_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
        model: 'news',
        key: 'id',
          },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull:true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull:true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    }, {
      sequelize,
      modelName: 'Comment',
      tableName: 'Comments',
      underscored: true,
      timestamps: true,
      paranoid: true,
    });
  
    return Comment;
  }