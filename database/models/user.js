module.exports = (sequelize, DataTypes) => {
  const options = {
    sequelize,
  };
  const User = sequelize.define(
    "User",
    {
      login: {
        type: DataTypes.TEXT,
        primaryKey: true,
      },
      email: {
        type: DataTypes.TEXT,
      },
      avatar: {
        type: DataTypes.TEXT,
      },
      description: {
        type: DataTypes.TEXT,
      },
      password: {
        type: DataTypes.TEXT,
      },
      firstName: {
        type: DataTypes.TEXT,
      },
      lastName: {
        type: DataTypes.TEXT,
      },
    },
    options
  );
  User.associate = function (models) {
    User.belongsToMany(models.InterestClub, {
      through: models.ClubParticipant,
      foreignKey: "userLogin",
      sourceKey: "login",
    });
  };
  return User;
};
