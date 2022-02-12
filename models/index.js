/* ----- Import Configuraion File & Database Module ----- */

const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

/* ----- Set Database Configuration ------ */

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

/* ----- Init DB ----- */

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* ----- Init Module ----- */

db.customer = require('./customer')(sequelize, Sequelize);
db.business = require('./business')(sequelize, Sequelize);
db.appointment = require('./appointment')(sequelize, Sequelize);

/* ----- Init Association ----- */

db.customer.hasMany(db.appointment, {as:"appointment"});
db.appointment.belongsTo(db.customer, {
  as: "customer"
});

db.business.hasMany(db.appointment, {as:"appointment"});
db.appointment.belongsTo(db.business, {
    as: "business"
});

module.exports = db;
