const sequelize = require("../config/database");
const Sequelize = require("sequelize");

/* import models. */
const productsModel = require("./productsModel");
const usersModel = require("./usersModel");
const variantsModel = require("./variantsModel");

/* models connections. */
const Products = productsModel(sequelize, Sequelize);
const Users = usersModel(sequelize, Sequelize);
const Variants = variantsModel(sequelize, Sequelize);

/* assosiations.  */
Products.hasMany(Variants, {foreignKey: "product_id"});

/* models connections exports. */
module.exports = {
	Products,
	Users,
	Variants,
};