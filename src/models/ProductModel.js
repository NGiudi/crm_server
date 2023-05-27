import { Products } from "../models/database/tablesConnection.js";

/* constants */
import { SETTINGS } from "../const/settings.js";

export class ProductModel {
	constructor() {
    
	}

	createProduct = async (body) => {
		const product = await Products.create({
			brand_name: body.brand_name,
			description: body.description,
			name: body.name,
			price: body.price,
			stock: body.stock,
		});

		return product;
	};

	deleteProduct = async (id) => {    
		const product = await Products.destroy({
			where: { id },
		});

		return product;
	};

	getProducts = async (page) => {
		const products = await Products.findAll({
			attributes: {
				exclude: ["deleted_at"],
			},
			limit: SETTINGS.PAGE_LIMIT,
			offset: (page - 1) * SETTINGS.PAGE_LIMIT,
		});

		return products;
	};

	getProduct = async (id) => {
		const product = await Products.findByPk(id, {
			attributes: {
				exclude: ["deleted_at"],
			},
		});

		return product;
	};

	updateProduct = async (product) => {
		product = await product.save();
		return product;
	};
}