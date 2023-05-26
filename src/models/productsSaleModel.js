const { TABLES } = require("../const/tableNames");

module.exports = (sequelize, type, refs) => {
	return sequelize.define(TABLES.PRODUCTS_SALE, {
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
		updatedAt: {
			field: "updated_at",
			type: type.DATE,
		},
		sale_id:{
			reference: {
				model: refs.sale,
				key: "id",
			},
			type: type.INTEGER,
		},
		seller_id:{
			reference: {
				model: refs.user,
				key: "id",
			},
			type: type.INTEGER,
		}
	},
	{
		paranoid: true
	});
};