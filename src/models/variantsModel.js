const { TABLES } = require("../const/tableNames");

module.exports = (sequelize, type) => {
	return sequelize.define(TABLES.VARIANTS, {
		createdAt: {
			field: "created_at",
			type: type.DATE,
		},
		deletedAt: {
			field: "deleted_at",
			type: type.DATE,
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
		package_count: {
			allowNull: false,
			type: type.INTEGER,
		},
		price: {
			allowNull: false,
			type: type.DOUBLE,
		},
		updatedAt: {
			field: "updated_at",
			type: type.DATE,
		},
		sku: {
			allowNull: false,
			type: type.STRING,
		}
	},
	{
		paranoid: true
	});
};