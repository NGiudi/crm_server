const sequelize = require("../config");
const Sequelize = require("sequelize");

/* import models. */
const productsModel = require("./productsModel");
const usersModel = require("./usersModel");
const salesModel = require("./salesModel");
const productsSaleModel = require("./productsSaleModel");

/* models connections. */
const Products = productsModel(sequelize, Sequelize);
const Users = usersModel(sequelize, Sequelize);
const Sales = salesModel(sequelize, Sequelize, Users);
const ProductsSale = productsSaleModel(sequelize, Sequelize, { 
	product: Products,
	sale: Sales,
	user: Users,
});

/* assosiations.  */
ProductsSale.belongsTo(Products, {foreignKey: "product_id"});
ProductsSale.belongsTo(Sales, { foreignKey: "sale_id" });
ProductsSale.belongsTo(Users, {foreignKey: "seller_id"});

/* models connections exports. */
module.exports = {
	Products,
	ProductsSale,
	Sales,
	Users,
};