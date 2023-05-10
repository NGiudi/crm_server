const sequelize = require("../config/database");
const Sequelize = require("sequelize");

/* import models. */
const productsModel = require("./productsModel");
const usersModel = require("./usersModel");

/* models connections. */
const Products = productsModel(sequelize, Sequelize);
const Users = usersModel(sequelize, Sequelize);

/* assosiations.  */

/* models connections exports. */
module.exports = {
	Products,
	Users,
};