/* middlewares */
const { authRoleMiddleware } = require("../../middlewares/auth");

/* controllers */
const UserController = require("../../controllers/userController");

class UserRoutes {

	constructor() {
		this.controller = new UserController();
		this.router = require("express").Router();
	}

	start() {
		this.router.get("/", authRoleMiddleware("admin"), this.controller.getPage);
		this.router.get("/:id", authRoleMiddleware("admin"), this.controller.getOne);
		this.router.put("/:id", authRoleMiddleware("admin"), this.controller.update);
		this.router.delete("/:id", authRoleMiddleware("admin"), this.controller.delete);
		this.router.post("/signup", authRoleMiddleware("admin"), this.controller.signup );
		this.router.post("/authentication", this.controller.authentication);
		this.router.post("/login", this.controller.login);
		this.router.post("/logout", this.controller.logout);
		
		return this.router;
	}
}

module.exports = UserRoutes;