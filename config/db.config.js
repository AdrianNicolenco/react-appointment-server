module.exports = {
  HOST: "localhost",  // Target Host
  USER: "root",       // Database User
  PASSWORD: "",       // Database Password
  DB: "test",         // Database Name
  dialect: "mysql",   // Databse Type
  pool: {
    max: 5,           // Maximum User
    min: 0,           // Minimum User
    acquire: 30000,   // maximum time that pool will try to get connection before throwing error
    idle: 10000,      // Maximum Time that a connection can be idle before being released
  },
};
