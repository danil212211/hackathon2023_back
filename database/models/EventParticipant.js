module.exports = (sequelize, DataTypes) => {
  const options = {
    sequelize,
  };
  const EventParticipant = sequelize.define(
    "EventParticipant",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      userLogin: {
        type: DataTypes.TEXT,
      },
      eventId: {
        type: DataTypes.BIGINT,
      },
    },
    options
  );
  EventParticipant.associate = function (models) {};
  return EventParticipant;
};
