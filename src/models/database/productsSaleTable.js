import { TABLES } from "../../const/tableNames.js";

export const productsSaleTable = (sequelize, type, refs) => {
	return sequelize.define(TABLES.PRODUCTS_SALE, {
		id:{
			autoIncrement: true,
			primaryKey: true,
			type: type.INTEGER,
		},
		price: {
			allowNull: false,
			type: type.DOUBLE,
		},
		product_id:{
			reference: {
				model: refs.product,
				key: "id",
			},
			type: type.INTEGER,
		},
		quantity: {
			type: type.INTEGER, 
		},
		sale_id:{
			reference: {
				model: refs.sale,
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