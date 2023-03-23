module.exports = (sequelize, DataTypes) => {
  const options = {
    sequelize,
  };
  const Post = sequelize.define(
    "Post",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      userLogin: {
        type: DataTypes.TEXT,
      },
      clubId: {
        type: DataTypes.BIGINT,
      },
      text: {
        type: DataTypes.JSON,
      },
    },
    options
  );
  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      targetKey: "login",
      foreignKey: "userLogin",
    });
    Post.belongsTo(models.InterestClub, {
      targetKey: "id",
      foreignKey: "clubId",
    });
  };
  return Post;
};
