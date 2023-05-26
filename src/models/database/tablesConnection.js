const sequelize = require("../../config");
const Sequelize = require("sequelize");

/* import models. */
const productsModel = require("./productsTable");
const usersModel = require("./usersTable");
const salesModel = require("./salesTable");
const productsSaleModel = require("./productsSaleTable");

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

/* models connections exports. */
module.exports = {
	Products,
	ProductsSale,
	Sales,
	Users,
};