module.exports = (sequelize, Sequelize) => {
  const appointment = sequelize.define(
    "appointment",
    {
      starttime: {
        type: Sequelize.STRING,
      },
      endtime: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
        allowNull:true
      },
      message: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.INTEGER,
        default: 0
      },
      isRead: {
        type: Sequelize.BOOLEAN,
        default: false
      },
    },
    {
      tableName: "appointment",
    }
  );
  return appointment;
};
