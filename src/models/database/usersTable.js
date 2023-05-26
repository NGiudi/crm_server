import { TABLES } from "../../const/tableNames.js";

export const usersTable = (sequelize, type) => {
	return sequelize.define(TABLES.USERS, {
		active: {
			allowNull: false,
			defaultValue: true,
			type: type.BOOLEAN,
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
	},
	{
		createdAt: "created_at",
		deletedAt: "deleted_at",
		paranoid: true,
		updatedAt: "updated_at",
	});
};