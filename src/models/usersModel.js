const { USERS_TABLE } = require("../const/tableNames");

module.exports = (sequelize, type) => {
	return sequelize.define(USERS_TABLE, {
		active: {
			allowNull: false,
			defaultValue: true,
			type: type.BOOLEAN,
		},
		deactivation_reason: {
			type: type.STRING,
		},
		email: {
			type: type.STRING,
			allowNull: false,
		},
		id:{
			autoIncrement: true,
			primaryKey: true,
			type: type.INTEGER,
		},
		last_name: {
			type: type.STRING,
			allowNull: false,
		},
		names: {
			type: type.STRING,
			allowNull: false,
		},
		password: {
			type: type.STRING,
			allowNull: false,
		},
		phone: {
			type: type.STRING,
		},
		role: {
			type: type.STRING,
			allowNull: false,
		},
		token: {
			type: type.STRING,
		},
	},
	{
		paranoid: true
	});
};