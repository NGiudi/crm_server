/* models */
//TODO: ver como sigo desarrollando esta clase.
const SaleDao = require("../models/DAOs/saleDao");

/* constants */
const { MESSAGES } = require("../const/responses");

//TODO: crear SaleServices
class SaleController {
  
  constructor() {

  }

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
  }
}

module.exports = SaleController;