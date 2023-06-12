import { SaleService } from "../services/SaleService.js";
import { MESSAGES } from "../const/responses.js";
import { Utils } from "../utils/index.js";

export class SaleController {
  
	constructor() {
		this.services = new SaleService();
	}

	create = async (req, res) => {
		const sale = req.body;

		if (!sale || !sale.products || sale.products.length === 0)
			return res.status(400).json({ message: MESSAGES.SALE_REQUIRED_FIELDS });
				
		try {
			const haveStock = await this.services.allProductsHaveStock(sale.products);

			if (!haveStock)
				return res.status(422).json({ message: MESSAGES.SALE_WITHOUT_STOCK });

			const newSale = await this.services.create(sale);
  
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
		const page = Utils.numbers.parseToInt(req.query.page, 1);

		const params = {
			page,
			seller_id: req.query.seller_id || null,
		}

		try {
			const salesObj = await this.services.getPage(params);  
			return res.status(200).json(salesObj);
		} catch {
			res.status(500).json();
		}
	};

	getStats = async (req, res) => {
		try {
		  const sellerId = req.query.sellerId;
		  const stats = await this.services.getStats(sellerId);
		  return res.status(200).json({ stats });
		} catch (error) {
		  console.log(error);
		  return res.status(500).json();
		}
	};
}