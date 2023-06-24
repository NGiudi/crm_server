import { SaleService } from "../services/SaleService.js";
import { MESSAGES } from "../const/responses.js";
import { validateSale, validateId, validatePage} from "../validations/saleValidation.js"

export class SaleController {
  
	constructor() {
		this.services = new SaleService();
	}

	create = async (req, res) => {
		const validation = validateSale(req.body);

		if (!validation.result)
			return res.status(400).json({ message: validation });
				
		try {
			const haveStock = await this.services.allProductsHaveStock(req.body.products);

			if (!haveStock)
				return res.status(422).json({ message: MESSAGES.SALE_WITHOUT_STOCK });

			const newSale = await this.services.create(req.body);
  
			return res.status(201).json(newSale);	
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
		const page = Number(req.query.page) || 1;
		const validationPage = validatePage({page});
		if (!validationPage.result)
			return res.status(400).json({ message: validationPage });

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
		const id = req.query.sellerId;
		const validationId = validateId({id});
		if (!validationId.result)
			return res.status(400).json({ message: validationId });

		try {
		  const stats = await this.services.getStats(id);
		  return res.status(200).json({ stats });
		} catch (error) {
		  console.log(error);
		  return res.status(500).json();
		}
	};
}