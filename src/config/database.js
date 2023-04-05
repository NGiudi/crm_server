require('dotenv').config();

const Sequilize = require('sequelize');

/* locals configurations. */
const logger = require('../utils/logger');

const sequilize = new Sequilize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    define: {
      freezeTableName: true,
      alter: true
    },
    logging: false
  }
);

sequilize.sync({force: false})
  .then(() => logger.info ('Sincronizated table!'))
  .catch ((error) => logger.error (`Table synchronization failed! ${error}`));

module.exports = sequilize;