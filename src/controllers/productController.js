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
		this.services = new ProductService();
	}

	create = async (req, res) => {
		if (isEmptyObject(req.body))
			return res.status(400).json({ message: MESSAGES.PRODUCT_REQUIRED_FIELDS });

		try {
			const product = await this.services.create(req.body);
			return res.status(201).json(product);
		} catch {
			return res.status(500).json();
		}
	};

	delete = async (req, res) => {
		const { id } = req.params;

		if (!id)
			return res.status(400).json({ message: MESSAGES.ID_REQUIRED });

		try {
			const count = await this.services.delete(id);

			if (count[0] === 0)
				return res.status(404).json({ message: MESSAGES.PRODUCT_NOT_FOUND });
      
			return res.status(204).json();
		} catch {
			return res.status(500).json();
		}
	};

	getOne = async (req, res) => {
		const { id } = req.params;

		if (!id)
			return res.status(400).json({ message: MESSAGES.ID_REQUIRED });

		try {
			const product = await this.services.getOne(id);
  
			if (product)
				return res.status(200).json(product);
  
			return res.status(404).json({ message: MESSAGES.PRODUCT_NOT_FOUND });  		
		} catch {
			return res.status(500).json();
		}
	};

	getPage = async (req, res) => {
		const page = parseToInt(req.query.page, 1);

		try {
			const products = await this.services.getPage(page);
			const stats = await getTableStats(Products, page);

			return res.status(200).json({ products, stats });
		} catch {
			res.status(500).json();
		}
	};

	update = async (req, res) => {
		const { id } = req.params;

		if (!id)
			return res.status(400).json({ message: MESSAGES.ID_REQUIRED });

		if (isEmptyObject(req.body))
			return res.status(400).json({ message: MESSAGES.QUERY_BODY_REQUIRED });

		try {
			const count = await this.services.update(id, req.body);

			if (count[0] === 0)
				return res.status(404).json({ message: MESSAGES.PRODUCT_NOT_FOUND });
  
			return res.status(200).json();
		} catch {
			return res.status(500).json();
		}
	};
}