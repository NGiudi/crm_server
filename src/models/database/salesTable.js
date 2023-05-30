import { TABLES } from "../../const/tableNames.js";

export const salesTable = (sequelize, type, refModel) => {
	return sequelize.define(TABLES.SALES, {
		client: {
			type: type.STRING,
		},
		id:{
			autoIncrement: true,
			primaryKey: true,
			type: type.INTEGER,
		},
		price: {
			allowNull: false,
			type: type.DOUBLE,
		},
		seller_id: {
			reference: {
				model: refModel,
				key: "id",
			},
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