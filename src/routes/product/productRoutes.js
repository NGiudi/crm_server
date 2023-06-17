import express from "express";

import { Authentication } from "../../middlewares/auth.js";
import { ProductController } from "../../controllers/productController.js";

export class ProductRoutes {

	constructor() {
		this.auth = new Authentication();
		this.controller = new ProductController();
		this.router = express.Router();
	}

	start() {
		this.router.get("/", this.auth.authLoggedInUser(), this.controller.getPage);
		this.router.get("/:id", this.auth.authLoggedInUser(), this.controller.getOne);
		this.router.post("/new", this.auth.authLoggedInUser(), this.controller.create);
		this.router.put("/:id", this.auth.authLoggedInUser(), this.controller.update);
		this.router.delete("/:id", this.auth.authLoggedInUser(), this.controller.delete);
		
		return this.router;
	}
}