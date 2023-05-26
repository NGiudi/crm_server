import express from "express";

/* middlewares */
import { authLoggedInUser } from "../../middlewares/auth.js";

/* controllers */
import { ProductController } from "../../controllers/productController.js";

export class ProductRoutes {

	constructor() {
		this.controller = new ProductController();
		this.router = express.Router();
	}

	start() {
		this.router.get("/", authLoggedInUser(), this.controller.getPage);
		this.router.get("/:id", authLoggedInUser(), this.controller.getOne);
		this.router.put("/:id", authLoggedInUser(), this.controller.update);
		this.router.delete("/:id", authLoggedInUser(), this.controller.delete);
		
		return this.router;
	}
}