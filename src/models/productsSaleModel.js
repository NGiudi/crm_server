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
		quantity: {
			type: type.INTEGER, 
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
		updatedAt: {
			field: "updated_at",
			type: type.DATE,
		},
		product_id:{
			reference: {
				model: refs.product,
				key: "id"
			},
			type: type.INTEGER,
		},
		sale_id:{
			reference: {
				model: refs.sale,
				key: "id"
			},
			type: type.INTEGER,
		}
	},
	{
		paranoid: true
	});
};