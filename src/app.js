const express = require("express");
const cors = require("cors");

require("dotenv").config();
/* routes */
const ProductRoutes = require("./routes/product/productRoutes");
const SaleRoutes = require("./routes/sale/saleRoutes");
const UserRoutes = require("./routes/user/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* routes in use. */
app.use("/products", new ProductRoutes().start());
app.use("/sales", new SaleRoutes().start());
app.use("/users", new UserRoutes().start());

/* init listen server in asigned port.*/
const port = process.env.PORT || 3005;

app.listen(port, () => {
	console.log(`Server runing in port ${port}...`);
});