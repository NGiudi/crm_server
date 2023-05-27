import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

/* routes */
import { ProductRoutes } from "./routes/product/productRoutes.js";
import { SaleRoutes } from "./routes/sale/saleRoutes.js";
import { UserRoutes } from "./routes/user/userRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* routes in use. */
app.use("/products", new ProductRoutes().start());
app.use("/sales", new SaleRoutes().start());
app.use("/users", new UserRoutes().start());

/* init listen server in asigned port.*/
const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
	console.log(`Server runing in port ${PORT}...`);
});