const sequelize = require("../config/database");
const Sequelize = require("sequelize");

/* import models. */
const addressesModel = require("./addressesModel");
const productsModel = require("./productsModel");
const usersModel = require("./usersModel");
const variantsModel = require("./variantsModel");

/* models connections. */
const Addresses = addressesModel(sequelize, Sequelize);
const Products = productsModel(sequelize, Sequelize);
const Users = usersModel(sequelize, Sequelize);
const Variants = variantsModel(sequelize, Sequelize);

/* assosiations.  */
Users.hasOne(Addresses, {foreignKey: "user_id"});
Addresses.hasOne(Users, {foreignKey: "address_id"});

Products.hasMany(Variants, {foreignKey: "product_id"});

/* models connections exports. */
module.exports = {
	Addresses,
	Products,
	Users,
	Variants,
};