const { TABLES } = require("../const/tableNames");

const { Users, Products } = require("./connectionsModel");

module.exports = (sequelize, type) => {
	return sequelize.define(TABLES.SALES, {
		createdAt: {
			field: "created_at",
			type: type.DATE,
		},
    date: {
      allowNull: false,
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
		product_id: {
      allowNull: false,
      references: {
				model: Products,
				key: "id",
			},
      type: type.INTEGER,
    },
    quantity: {
      allowNull: false,
			type: type.INTEGER,
    },
		updatedAt: {
			field: "updated_at",
			type: type.DATE,
		},
    user_id: {
      allowNull: false,
      references: {
				model: Users,
				key: "id",
			},
      type: type.INTEGER,
    },
	},
	{
		paranoid: true
	});
};