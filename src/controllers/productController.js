/* utils */
const { isEmptyObject } = require("../utils/objects");
const { getTableStats } = require("../utils/tables");
const { parseToInt } = require("../utils/numbers");

/* models */
const { Products } = require("../models/connectionsModel");

/* constants */
const { MESSAGES } = require("../const/responses");
const { SETTINGS } = require("../const/settings");

//TODO: crear ProductServices;
class ProductController {
  
	constructor() {
		//TODO: this.service = new ProductServices();
	}

	getPage = async (req, res) => {
		const page = parseToInt(req.query.page, 1);

		try {
			const products = await Products.findAll({
				attributes: {
					exclude: ["deleted_at"],
				},
				limit: SETTINGS.PAGE_LIMIT,
				offset: (page - 1) * SETTINGS.PAGE_LIMIT,
			});
  
			const stats = await getTableStats(Products, page);
  
			return res.status(200).json({ products, stats });
		} catch {
			res.status(500).json();
		}
	};

	getOne = async (req, res) => {
		try {
			const product = await Products.findByPk(req.params.id, {
				attributes: { 
					exclude: ["deleted_at"],
				},
			});
  
			if (product)
				return res.status(200).json(product);
  
			return res.status(404).json({ message: MESSAGES.PRODUCT_NOT_FOUND });  		
		} catch {
			return res.status(500).json();
		}
	};

	update = async (req, res) => {
		if (isEmptyObject(req.body))
			return res.status(400).json({ message: MESSAGES.QUERY_BODY_REQUIRED });
  
		try {
			const product = await Products.findByPk(req.params.id, {
				attributes: { 
					exclude: ["deleted_at"],
				},
			});
  
			if (!product)
				return res.status(404).json({ message: MESSAGES.PRODUCT_NOT_FOUND });
  
			// update product fields.
			Object.assign(product, req.body);
			await product.save();
  
			return res.json({ product });
		} catch {
			return res.status(500).json();
		}
	};

	delete = async (req, res) => {
		try {
			const product = await Products.destroy({
				where: { id: req.params.id },
			});
  
			if (!product)
				return res.status(404).json({ message: MESSAGES.PRODUCT_NOT_FOUND });
      
			return res.status(204).json();
		} catch {
			return res.status(500).json();
		}
	};
}

module.exports = ProductController;