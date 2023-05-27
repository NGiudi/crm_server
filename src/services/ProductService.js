import { ProductModel } from "../models/ProductModel.js";

export class ProductService {
	constructor() {
		this.model = new ProductModel();
	}

	createProduct = async (body) => {
		const product = this.model.createProduct(body);
		return product;
	};

	deleteProduct = async (id) => {
		const products = await this.model.deleteProduct(id);
		return products;
	};

	getProducts = async (page) => {
		const products = await this.model.getProducts(page);
		return products;
	};

	getProduct = async(id) => {
		const product = await this.model.getProduct(id);
		return product;
	};

	updateProduct = async(orgProduct, changedProduct) => {
		Object.assign(orgProduct, changedProduct);

		const product = await this.model.updateProduct(orgProduct);
		return product;
	};
}