const { TABLES } = require("../const/tableNames");

module.exports = (sequelize, type, refModel) => {
	return sequelize.define(TABLES.SALES, {
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
		updatedAt: {
			field: "updated_at",
			type: type.DATE,
		},
		seller_id:{
			reference: {
				model: refModel,
				key: "id",
			},
			type: type.INTEGER,
		},
		user_id: {
			references: {
				model: refModel,
				key: "id",
			},
			type: type.INTEGER,
		},
	},
	{
		paranoid: true,
	});
};