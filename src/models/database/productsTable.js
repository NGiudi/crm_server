import { TABLES } from "../../const/tableNames.js";

export const productsTable = (sequelize, type) => {
	return sequelize.define(TABLES.PRODUCTS, {
		brand_name: {
			type: type.STRING,
		},
		description: {
			type: type.STRING, 
		},
		discount: {
			allowNull: true,
			defaultValue: 0,
			type: type.STRING,
		},
		id:{
			autoIncrement: true,
			primaryKey: true,
			type: type.INTEGER,
		},
		name: {
			allowNull: false,
			type: type.STRING,
		},
		price: {
			allowNull: false,
			type: type.DOUBLE,
		},
		stock_reserved: {
			allowNull: true,
			defaultValue: 0,
			type: type.INTEGER,
		},
		stock: {
			allowNull: false,
			defaultValue: 0,
			type: type.INTEGER,
		},
	},
	{
		createdAt: "created_at",
		deletedAt: "deleted_at",
		paranoid: true,
		updatedAt: "updated_at",
	});
};