/* utils */
//const { isEmptyObject } = require("../utils/objects");
const { getTableStats } = require("../utils/tables");
const { parseToInt } = require("../utils/numbers");

/* models */
//TODO: ver como sigo desarrollando esta clase.
const SaleDao = require("../models/DAOs/saleDao");
const { ProductsSale, Sales } = require("../models/connectionsModel");

/* constants */
const { MESSAGES } = require("../const/responses");
const { SETTINGS } = require("../const/settings");

//TODO: crear SaleServices
class SaleController {
  
	constructor() {

	}

	getPage = async (req, res) => {
		const page = parseToInt(req.query.page, 1);

		try {
			const sales = await Sales.findAll({
				attributes: {
					exclude: ["deleted_at"],
				},
				limit: SETTINGS.PAGE_LIMIT,
				offset: (page - 1) * SETTINGS.PAGE_LIMIT,
			});
			const stats = await getTableStats(Sales, page);
  
			return res.status(200).json({ sales, stats });
		} catch (error){
			res.status(500).json(error);
		}
	};

	getOne = async (req, res) => {
		try {
			const productsSales = await ProductsSale.findAll({
				where: { sale_id: req.params.id },
			});
			const sales = await Sales.findByPk(req.params.id, {
			});
			if (sales) {
				return res.status(200).json({...sales.dataValues, products: productsSales});
			}
				
			return res.status(404).json({ message: MESSAGES.SALE_NOT_FOUND });  		
		} catch {
			return res.status(500).json();
		}
	};

	delete = async (req, res) => {
		try {
			const sale = await Sales.destroy({
				where: { id: req.params.id },
			});
  
			if (!sale)
				return res.status(404).json({ message: MESSAGES.SALE_NOT_FOUND });
      
			return res.status(204).json();
		} catch {
			return res.status(500).json();
		}
	};

	create = async (req, res) => {
		const { items } = req.body;
  
		if (!items || items.length === 0)
			return res.status(400).json({ message: MESSAGES.SALE_REQUIRED_FIELDS });
  
		try {
			const sale = new SaleDao();
      
			if (sale.createSale(items)) {
				return res.status(200).json({ message: MESSAGES.SALE_CREATED });
			}
  
			return res.status(400).json({ message: MESSAGES.SALE_WITHOUT_STOCK });
		} catch (err) {
			console.error(err);
			return res.status(500).json();
		}
	};
}

module.exports = SaleController;