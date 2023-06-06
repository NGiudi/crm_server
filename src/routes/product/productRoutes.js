import express from "express";

import { ProductController } from "../../controllers/productController.js";
import { authLoggedInUser } from "../../middlewares/auth.js";

export class ProductRoutes {

	constructor() {
		this.controller = new ProductController();
		this.router = express.Router();
	}

	start() {
		this.router.get("/", authLoggedInUser(), this.controller.getPage);
		this.router.get("/:id", authLoggedInUser(), this.controller.getOne);
		this.router.post("/new", authLoggedInUser(), this.controller.create);
		this.router.put("/:id", authLoggedInUser(), this.controller.update);
		this.router.delete("/:id", authLoggedInUser(), this.controller.delete);
		
		return this.router;
	}
}