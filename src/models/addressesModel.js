const { TABLES } = require("../const/tableNames");

module.exports = (sequelize, type) => {
	return sequelize.define(TABLES.ADDRESSES, {
		apartament: {
			type: type.STRING,
		},
		city: {
			allowNull: false,
			type: type.STRING,
		},
		country: {
			allowNull: false,
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
		street_name: {
			allowNull: false,
			type: type.STRING,
		},
		street_number: {
			allowNull: false,
			type: type.INTEGER,
		},
		updatedAt: {
			field: "updated_at",
			type: type.DATE,
		},
		zip_code: {
			allowNull: false,
			type: type.INTEGER,
		},
	},
	{
		paranoid: true,
	});
};