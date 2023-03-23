module.exports = (sequelize, DataTypes) => {
  const options = {
    sequelize,
  };
  const ClubParticipant = sequelize.define(
    "ClubParticipant",
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
    },
    options
  );
  ClubParticipant.associate = function (models) {};
  return ClubParticipant;
};
