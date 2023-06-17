import express from "express";

import { Authentication } from "../../middlewares/auth.js";
import { SaleController } from "../../controllers/saleController.js";

export class SaleRoutes {
  
	constructor() {
		this.auth = new Authentication(); 
		this.controller = new SaleController();
		this.router = express.Router();
	}
  
	start() {
		this.router.post("/", this.auth.authLoggedInUser(), this.controller.create);
		this.router.get("/", this.auth.authLoggedInUser(), this.controller.getPage);
		this.router.get("/stats", this.auth.authLoggedInUser(), this.controller.getStats);
		this.router.get("/:id", this.auth.authLoggedInUser(), this.controller.getOne);

		return this.router;
	}
}