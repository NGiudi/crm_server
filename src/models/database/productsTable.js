const { TABLES } = require("../../const/tableNames");

module.exports = (sequelize, type) => {
	return sequelize.define(TABLES.PRODUCTS, {
		brand_name: {
			type: type.STRING,
		},
		description: {
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
		stock: {
			allowNull: false,
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