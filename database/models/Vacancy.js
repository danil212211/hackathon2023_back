module.exports = (sequelize, DataTypes) => {
  const options = {
    sequelize,
  };
  const Vacancy = sequelize.define(
    "Vacancy",
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
      description: { type: DataTypes.TEXT },
      requirements: { type: DataTypes.JSON },
      contactNumber: { type: DataTypes.TEXT },
      contactEmail: { type: DataTypes.TEXT },
    },
    options
  );
  Vacancy.associate = function (models) {
    Vacancy.belongsTo(models.User, {
      targetKey: "login",
      foreignKey: "userLogin",
    });
  };
  return Vacancy;
};
