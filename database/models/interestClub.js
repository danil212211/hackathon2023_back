module.exports = (sequelize, DataTypes) => {
  const options = {
    sequelize,
  };
  const InterestClub = sequelize.define(
    "InterestClub",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.TEXT,
      },
      description: {
        type: DataTypes.TEXT,
      },
      textColor: {
        type: DataTypes.TEXT,
      },
      backgroundColor: {
        type: DataTypes.TEXT,
      },
      image: {
        type: DataTypes.TEXT,
      },
    },
    options
  );
  InterestClub.associate = function (models) {
    InterestClub.belongsToMany(models.User, {
      through: models.ClubParticipant,
      foreignKey: "clubId",
      sourceKey: "id",
    });
    InterestClub.hasMany(models.Post, {
      sourceKey: "id",
      foreignKey: "clubId",
    });
  };
  return InterestClub;
};
