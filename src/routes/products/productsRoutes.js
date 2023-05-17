/* middlewares */
const { authLoggedInUser } = require("../../middlewares/auth");

/* controllers */
const ProductController = require("../../controllers/productControllers");

class ProductRouter {

	constructor() {
		this.controller = new ProductController();
		this.router = require("express").Router();
	}

	start() {
		this.router.get("/", authLoggedInUser(), this.controller.getPage);
		this.router.get("/:id", authLoggedInUser(), this.controller.getOne);
		this.router.put("/:id", authLoggedInUser(), this.controller.update);
		this.router.delete("/:id", authLoggedInUser(), this.controller.delete);
		
		return this.router;
	}
}

module.exports = ProductRouter;