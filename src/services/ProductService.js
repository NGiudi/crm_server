import { ProductModel } from "../models/ProductModel.js";

export class ProductService {
	constructor() {
		this.model = new ProductModel();
	}

	create = async (body) => {
		const product = this.model.create(body);
		return product;
	};

	delete = async (id) => {
		const products = await this.model.delete(id);
		return products;
	};

	getOne = async (id) => {
		const product = await this.model.getOne(id);
		return product;
	};

	getPage = async (page) => {
		const products = await this.model.getPage(page);
		return products;
	};

	update = async(id, modifiedProduct) => {
		const product = await this.model.update(id, modifiedProduct);
		return product;
	};
}