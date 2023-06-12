import lodash from "lodash";

import { Products } from "../models/database/tablesConnection.js";
import { SaleModel } from "../models/SaleModel.js";
import { Utils } from "../utils/index.js";

export class SaleService {
	constructor() {
		this.model = new SaleModel();
	}

	#calculateTotalPrice(productsSale) {
		return productsSale.reduce((acc, ps) => {
			ps.price = ps.price * (100 - ps.discount) / 100;
			return acc + (ps.price * ps.quantity);
		}, 0);
	}

	async #haveProductStock(product) {
		if (product.quantity <= 0)
			return false;

		const p = await Products.findByPk(product.product_id, {
			attributes: ["id", "stock"],
		});

		return product.quantity <= p.dataValues.stock;
	}

	async allProductsHaveStock(productsList) {
		for (let i = 0; i < productsList.length; i++) {
			const haveStock = await this.#haveProductStock(productsList[i]);

			if (!haveStock)
				return false;
		}

		return true;
	}

	//TODO: Lo más correcto es obtener el precio de los productos desde el back.
	// y no obtenerlo desde el front como estamos haciendo ahora.
	create = async (body) => {
		let sale = lodash.pick(body, ["client", "seller_id"]);
	
		sale.price = this.#calculateTotalPrice(body.products);

		sale = await this.model.create(sale);

		body.products.forEach(async productSale => {
			productSale.sale_id = sale.id;	
			await this.model.createProductSale(productSale);
			await this.model.updateStock(productSale);
		});
		
		return sale;
	};

	getOne = async (id) => {
		const sale = await this.model.getOne(id);
		return sale;
	}	

	getPage = async (params) => {
		const { count, rows } = await this.model.getPage(params);

		const stats = await Utils.tables.getPaginationStats(params.page, count);

		return { sales: rows, stats };
	}

	getProductsSaleOfSale = async (id) => {
		const productsSale = await this.model.getProductsSaleOfSale(id);
		return productsSale;
	}

	getStats = async (sellerId) => {
		const stats = await this.model.getStats(sellerId);
		return stats;
	}
}