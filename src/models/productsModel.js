const { TABLES } = require("../const/tableNames");

module.exports = (sequelize, type) => {
	return sequelize.define(TABLES.PRODUCTS, {
		brand_name: {
			type: type.STRING,
		},
		createdAt: {
			field: "created_at",
			type: type.DATE,
		},
		deletedAt: {
			field: "deleted_at",
			type: type.DATE,
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
		updatedAt: {
			field: "updated_at",
			type: type.DATE,
		},
	},
	{
		paranoid: true
	});
};