import { Sales, Products, ProductsSale } from "../models/database/tablesConnection.js";

export class SalesServices {
	constructor() {

	}

	async #haveProductStock(product) {
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

	createSale = async (sale) => {
		//TODO: aca tengo que bajar el stock.
		const saleDb = await Sales.create({
			client: sale.client,
			price: 0, //calcular este valor
			seller_id: sale.seller_id,
		});

		sale.products.forEach(async productSale => {
			await ProductsSale.create({
				quantity: productSale.quantity,
				price: productSale.price,
				product_id: productSale.product_id,
				sale_id: saleDb.id,
			});
		});
	};
}