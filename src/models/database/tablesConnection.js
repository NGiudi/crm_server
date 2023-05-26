import Sequelize from "sequelize";

import { sequelize } from "../../config.js";

/* import models. */
import { productsSaleTable } from "./productsSaleTable.js";
import { productsTable } from "./productsTable.js";
import { salesTable } from "./salesTable.js";
import { usersTable } from "./usersTable.js";

/* models connections. */
export const Products = productsTable(sequelize, Sequelize);
export const Users = usersTable(sequelize, Sequelize);
export const Sales = salesTable(sequelize, Sequelize, Users);

export const ProductsSale = productsSaleTable(sequelize, Sequelize, { 
	product: Products,
	sale: Sales,
	user: Users,
});

/* assosiations.  */
ProductsSale.belongsTo(Products, {foreignKey: "product_id"});
ProductsSale.belongsTo(Sales, { foreignKey: "sale_id" });

Sales.belongsTo(Users, {foreignKey: "seller_id"} );