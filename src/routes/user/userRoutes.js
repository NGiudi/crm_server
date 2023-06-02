import express from "express";

import { authActiveUser, authRoleMiddleware } from "../../middlewares/auth.js";
import { UserController } from "../../controllers/userController.js";

export class UserRoutes {

	constructor() {
		this.controller = new UserController();
		this.router = express.Router();
	}

	start() {
		this.router.delete("/:id", authRoleMiddleware("admin"), this.controller.delete);
		this.router.get("/:id", authRoleMiddleware("admin"), this.controller.getOne);
		this.router.get("/", authRoleMiddleware("admin"), this.controller.getPage);
		this.router.put("/:id", authRoleMiddleware("admin"), this.controller.update);
		
		this.router.post("/authentication", authActiveUser(), this.controller.authentication);
		this.router.post("/signup", authRoleMiddleware("admin"), this.controller.create);
		this.router.post("/login", authActiveUser(), this.controller.login);
		this.router.post("/logout", this.controller.logout);
		
		return this.router;
	}
}