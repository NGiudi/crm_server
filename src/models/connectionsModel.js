const sequelize = require('../config/database');
const Sequelize = require('sequelize');

/* import models. */
const addressesModel = require('./addressesModel');
const usersModel = require('./usersModel');

/* models connections. */
const Addresses = addressesModel(sequelize, Sequelize);
const Users = usersModel(sequelize, Sequelize);

/* assosiations.  */
Users.hasOne(Addresses, {foreignKey: 'user_id'});
Addresses.hasOne(Users, {foreignKey: 'address_id'});

/* models connections exports. */
module.exports = {
  Addresses,
  Users,
};