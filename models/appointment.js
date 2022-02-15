module.exports = (sequelize, Sequelize) => {
  const appointment = sequelize.define(
    "appointment",
    {
      starttime: {
        type: Sequelize.DATE,
      },
      endtime: {
        type: Sequelize.DATE,
      },
      location: {
        type: Sequelize.STRING,
        allowNull:true
      },
      title: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull:false,
        defaultValue: 0
      },
      isRead: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue: false
      },
    },
    {
      tableName: "appointment",
    }
  );
  return appointment;
};
