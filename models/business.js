module.exports = (sequelize, Sequelize) => {
    const business = sequelize.define(
      "business",
      {
        name: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
        },
        location: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING,
        },
      },
      {
        tableName: "business",
      }
    );
    return business;
  };
  