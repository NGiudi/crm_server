import express from "express";

import { Authentication } from "../../middlewares/auth.js";
import { UserController } from "../../controllers/userController.js";

export class UserRoutes {

	constructor() {
		this.auth = new Authentication();
		this.controller = new UserController();
		this.router = express.Router();
	}

	start() {
		this.router.delete("/:id", this.auth.authRoleMiddleware("admin"), this.controller.delete);
		this.router.get("/:id", this.auth.authRoleMiddleware("admin"), this.controller.getOne);
		this.router.get("/", this.auth.authRoleMiddleware("admin"), this.controller.getPage);
		this.router.put("/:id", this.auth.authRoleMiddleware("admin"), this.controller.update);
		
		this.router.post("/authentication", this.auth.authLoggedInUser(), this.controller.authentication);
		this.router.post("/signup", this.auth.authRoleMiddleware("admin"), this.controller.create);
		this.router.post("/login", this.controller.login);
		this.router.post("/logout", this.controller.logout);
		
		return this.router;
	}
}