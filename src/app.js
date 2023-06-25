import cors from "cors";
import express from "express";

/* routes */
import { ProductRoutes } from "./routes/product/productRoutes.js";
import { SaleRoutes } from "./routes/sale/saleRoutes.js";
import { UserRoutes } from "./routes/user/userRoutes.js";

export class App {

	constructor(port){
		this.app = express();
		this.PORT = port;
	}

	start(){
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		
		/* routes in use. */
		this.app.use("/products", new ProductRoutes().start());
		this.app.use("/sales", new SaleRoutes().start());
		this.app.use("/users", new UserRoutes().start());
		
		/* init listen server in asigned port.*/
		this.server = this.app.listen(this.PORT, () => {
			console.log(`Server runing in port ${this.PORT}...`);
		});

		return this.app
	}

	stop(){
		this.server.close();
	}
}