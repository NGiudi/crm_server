const sequelize = require("../config");
const Sequelize = require("sequelize");

/* import models. */
const productsModel = require("./productsModel");
const usersModel = require("./usersModel");
const salesModel = require("./salesModel");

/* models connections. */
const Products = productsModel(sequelize, Sequelize);
const Users = usersModel(sequelize, Sequelize);

const Sales = salesModel(sequelize, Sequelize, Users);

/* assosiations.  */

/* models connections exports. */
module.exports = {
	Products,
	Sales,
	Users,
};