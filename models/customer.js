/* ------ Define Customer Model ------ */

module.exports = (sequelize, Sequelize) => {
  const customer = sequelize.define(
    "customer",
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
      tableName: "customer",
    }
  );
  return customer;
};
