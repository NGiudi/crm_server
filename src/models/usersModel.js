const { TABLES } = require("../const/tableNames");

module.exports = (sequelize, type) => {
	return sequelize.define(TABLES.USERS, {
		active: {
			allowNull: false,
			defaultValue: true,
			type: type.BOOLEAN,
		},
		createdAt: {
			field: "created_at",
			type: type.DATE,
		},
		deletedAt: {
			field: "deleted_at",
			type: type.DATE,
		},
		email: {
			allowNull: false,
			type: type.STRING,
		},
		id:{
			autoIncrement: true,
			primaryKey: true,
			type: type.INTEGER,
		},
		last_name: {
			allowNull: false,
			type: type.STRING,
		},
		names: {
			allowNull: false,
			type: type.STRING,
		},
		password: {
			allowNull: false,
			type: type.STRING,
		},
		phone: {
			type: type.STRING,
		},
		role: {
			allowNull: false,
			type: type.STRING,
		},
		token: {
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