/* utils */
import { getTableStats } from "../utils/tables.js";
import { parseToInt } from "../utils/numbers.js";

/* models */
import { Products, ProductsSale, Sales, Users } from "../models/database/tablesConnection.js";
import { SalesServices } from "../services/SalesServices.js";

/* constants */
import { MESSAGES } from "../const/responses.js";
import { SETTINGS } from "../const/settings.js";

//TODO: crear SaleServices
export class SaleController {
  
	constructor() {
		this.services = new SalesServices();
	}

	getPage = async (req, res) => {
		const page = parseToInt(req.query.page, 1);

		try {
			const sales = await Sales.findAll({
				include: [{ 
					model: Users,
					attributes:["id","names","last_name"]		
				}],
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
				include: [{ 
					model: Products,
					attributes:["id","brand_name","name","description","price"]		
				}],
			});
			const sales = await Sales.findByPk(req.params.id, {
				include: [{ 
					model: Users,
					attributes:["id","names","last_name"]		
				}],
			});
			if (sales) {
				return res.status(200).json({ ...sales.dataValues, products: productsSales });
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
  
			if (!sale) {
				return res.status(404).json({ message: MESSAGES.SALE_NOT_FOUND });
			} else {
				await ProductsSale.destroy({
					where: { sale_id: req.params.id },
				});
			}
			
			return res.status(204).json();
		} catch {
			return res.status(500).json();
		}
	};

	create = async (req, res) => {
		const sale = req.body;

		if (!sale || !sale.products || sale.products.length === 0)
			return res.status(400).json({ message: MESSAGES.SALE_REQUIRED_FIELDS });
		
		if (!this.services.allProductsHaveStock(sale.products))
			return res.status(400).json({ message: MESSAGES.SALE_WITHOUT_STOCK });	
		
		try {
			this.services.createSale(sale);
  
			return res.status(200).json({ message: MESSAGES.SALE_CREATED });	
		} catch (err) {
			return res.status(500).json();
		}
	};
}