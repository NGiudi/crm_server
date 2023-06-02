import express from "express";

import { SaleController } from "../../controllers/saleController.js";
import { authLoggedInUser } from "../../middlewares/auth.js";

export class SaleRoutes {
  
	constructor() {
		this.controller = new SaleController();
		this.router = express.Router();
	}
  
	start() {
		this.router.post("/", authLoggedInUser(), this.controller.create);
		this.router.get("/", authLoggedInUser(), this.controller.getPage);
		this.router.get("/:id", authLoggedInUser(), this.controller.getOne);

		return this.router;
	}
}