/* middlewares */
const { authLoggedInUser } = require("../../middlewares/auth");

/* controllers */
const SaleController = require("../../controllers/saleController");

class SaleRoutes {
  
	constructor() {
		this.controller = new SaleController();
		this.router = require("express").Router();
	}
  
	start() {
		this.router.post("/", authLoggedInUser(), this.controller.create);
    
		return this.router;
	}
}

module.exports = SaleRoutes;