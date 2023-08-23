const Sequelize = require('sequelize');

// connecting to postgres db
const conn = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/snap_sage_db',
  {
    // Set the logging option to false to turn off logging
    logging: true,
  }
);

module.exports = conn;
