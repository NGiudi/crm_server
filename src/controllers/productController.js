import { Products } from "../models/database/tablesConnection.js";
import { ProductService } from "../services/ProductService.js";
import { MESSAGES } from "../const/responses.js";
import { Utils } from "../utils/index.js";
import { validateProduct, validateId, validatePage} from "../validations/productValidation.js"

export class ProductController {
  
	constructor() {
		this.services = new ProductService();
	}

	create = async (req, res) => {
		const validation = validateProduct(req.body);	
		if (!validation.result)
			return res.status(400).json({ message: validation });

		try {
			const product = await this.services.create(req.body);
			return res.status(201).json(product);
		} catch {
			return res.status(500).json();
		}
	};

	delete = async (req, res) => {
		const id = Number(req.params.id);
		const validationId = validateId({id});
		if (!validationId.result)
			return res.status(400).json({ message: validationId });
	
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
		const id = Number(req.params.id);
		const validationId = validateId({id});
		if (!validationId.result)
			return res.status(400).json({ message: validationId });
	
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
		const page = Number(req.query.page) || 1;
		const validationPage = validatePage({page});
		if (!validationPage.result)
			return res.status(400).json({ message: validationPage });
	
		const params = {
			page,
			q: req.query.q || null,
		}

		try {
			const products = await this.services.getPage(params);
			const stats = await Utils.tables.getTableStats(Products, page);

			return res.status(200).json({ products, stats });
		} catch {
			res.status(500).json();
		}
	};

	update = async (req, res) => {
		const id = Number(req.params.id);
		const validationId = validateId({id});
		if (!validationId.result)
			return res.status(400).json({ message: validationId });
		
		const validationBody = validateProduct(req.body);	
		if (!validationBody.result)
			return res.status(400).json({ message: validationBody });

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