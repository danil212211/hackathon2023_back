module.exports = (sequelize, DataTypes) => {
  const options = {
    sequelize,
  };
  const Event = sequelize.define(
    "Event",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      userLogin: {
        type: DataTypes.TEXT,
      },
      name: {
        type: DataTypes.TEXT,
      },
      date: {
        type: DataTypes.DATE,
      },
      level: {
        type: DataTypes.TEXT,
      },
      description: { type: DataTypes.TEXT },
      place: {
        type: DataTypes.TEXT,
      },
    },
    options
  );
  Event.associate = function (models) {
    Event.belongsTo(models.User, {
      targetKey: "login",
      foreignKey: "userLogin",
    });
    Event.belongsToMany(models.User, {
      through: models.EventParticipant,
      foreignKey: "eventId",
      sourceKey: "id",
    });
  };
  return Event;
};
