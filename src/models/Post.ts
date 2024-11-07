import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Post extends Model {
  public id!: string;
  public title!: string;
  public desc!: string;
  public date!: Date;
}

Post.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Post",
    tableName: "posts",
  }
);

export default Post;
