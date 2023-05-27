/* services */
import { ProductService } from "../services/ProductService.js";

/* utils */
import { isEmptyObject } from "../utils/objects.js";
import { getTableStats }from "../utils/tables.js";
import { parseToInt } from "../utils/numbers.js";

/* models */
import { Products } from "../models/database/tablesConnection.js";

/* constants */
import { MESSAGES } from "../const/responses.js";

export class ProductController {
  
	constructor() {
		this.service = new ProductService();
	}

	create = async (req, res) => {
		let product = req.body;

		if (isEmptyObject(req.body))
			return res.status(400).json({ message: MESSAGES.PRODUCT_REQUIRED_FIELDS });

		product = await this.service.createProduct(req.body);

		return res.status(201).json(product);
	};

	delete = async (req, res) => {
		const { id } = req.params;

		if (!id)
			return res.status(400).json({ message: MESSAGES.PRODUCT_REQUIRED_ID });

		try {
			const product = await this.service.deleteProduct(id);

			if (!product)
				return res.status(404).json({ message: MESSAGES.PRODUCT_NOT_FOUND });
      
			return res.status(204).json();
		} catch {
			return res.status(500).json();
		}
	};

	getPage = async (req, res) => {
		const page = parseToInt(req.query.page, 1);

		try {
			const products = await this.service.getProducts(page);
			const stats = await getTableStats(Products, page);

			return res.status(200).json({ products, stats });
		} catch {
			res.status(500).json();
		}
	};

	getOne = async (req, res) => {
		const { id } = req.params;

		if (!id)
			return res.status(400).json({ message: MESSAGES.PRODUCT_REQUIRED_ID });

		try {
			const product = await this.service.getProduct(id);
  
			if (product)
				return res.status(200).json(product);
  
			return res.status(404).json({ message: MESSAGES.PRODUCT_NOT_FOUND });  		
		} catch {
			return res.status(500).json();
		}
	};

	update = async (req, res) => {
		const { id } = req.params;

		if (!id)
			return res.status(400).json({ message: MESSAGES.PRODUCT_REQUIRED_ID });

		if (isEmptyObject(req.body))
			return res.status(400).json({ message: MESSAGES.QUERY_BODY_REQUIRED });

		try {
			const product = await this.service.getProduct(id);
  
			if (!product)
				return res.status(404).json({ message: MESSAGES.PRODUCT_NOT_FOUND });
  
			this.service.updateProduct(product, req.body);

			return res.json({ product });
		} catch {
			return res.status(500).json();
		}
	};
}