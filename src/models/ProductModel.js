import { Sequelize } from "sequelize";

import { Products } from "../models/database/tablesConnection.js";

/* constants */
import { SETTINGS } from "../const/settings.js";

export class ProductModel {
	constructor() {
    
	}

	create = async (body) => {
		const product = await Products.create({
			brand_name: body.brand_name,
			description: body.description,
			name: body.name,
			price: body.price,
			stock: body.stock,
		});

		return product;
	}

	delete = async (id) => {    
		const count = await Products.destroy({
			where: { id },
		});

		return count;
	}

	getOne = async (id) => {
		const product = await Products.findByPk(id, {
			attributes: {
				exclude: ["deleted_at"],
			},
		});

		return product;
	}

	getPage = async (params) => {
		const { page, q } = params;

		const products = await Products.findAll({
			attributes: {
				exclude: ["deleted_at"],
			},
			limit: SETTINGS.PAGE_LIMIT,
			offset: (page - 1) * SETTINGS.PAGE_LIMIT,
			where: {
        description: {
          [Sequelize.Op.like]: q ? `%${q}%` : '%',
        },
      }
		});

		return products;
	}

	update = async (id, modifiedProduct) => {
		const count = await Products.update(modifiedProduct, {
			where: { id },
		});

		return count;
	}
}