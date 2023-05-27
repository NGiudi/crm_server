/* utils */
import { getTableStats } from "../utils/tables.js";
import { parseToInt } from "../utils/numbers.js";

/* models */
import { Sales } from "../models/database/tablesConnection.js";
import { SaleService } from "../services/SaleService.js";

/* constants */
import { MESSAGES } from "../const/responses.js";

export class SaleController {
  
	constructor() {
		this.services = new SaleService();
	}

	create = async (req, res) => {
		const sale = req.body;

		if (!sale || !sale.products || sale.products.length === 0)
			return res.status(400).json({ message: MESSAGES.SALE_REQUIRED_FIELDS });
				
		try {
			if (!this.services.allProductsHaveStock(sale.products))
				return res.status(400).json({ message: MESSAGES.SALE_WITHOUT_STOCK });

			const newSale = await this.services.createSale(sale);
  
			return res.status(201).json(newSale);	
		} catch {
			return res.status(500).json();
		}
	};

	getOne = async (req, res) => {
		const { id } = req.params;

		if (!id)
			return res.status(400).json({ message: MESSAGES.ID_REQUIRED });

		try {
			const sale = await this.services.getOne(id);

			if (!sale)
				return res.status(404).json({ message: MESSAGES.SALE_NOT_FOUND });
			
			const productsSales = await this.services.getProductsSaleOfSale(id);
			
			return res.status(200).json({ ...sale.dataValues, products: productsSales });
		} catch {
			return res.status(500).json();
		}
	};

	getPage = async (req, res) => {
		const page = parseToInt(req.query.page, 1);

		try {
			const sales = await this.services.getPage(page);
			const stats = await getTableStats(Sales, page);
  
			return res.status(200).json({ sales, stats });
		} catch {
			res.status(500).json();
		}
	};
}