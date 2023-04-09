const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();

/* local configurations */
const logger = require("./utils/logger");

/* routes */
const productsRoutes = require("./routes/productsRoutes");
const usersRoutes = require("./routes/usersRoutes");
const variantsRoutes = require("./routes/variantsRoutes");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* routes in use. */
app.use("/products", productsRoutes);
app.use("/users", usersRoutes);
app.use("/variants", variantsRoutes);

/* init listen server in asigned port.*/
const port = process.env.PORT || 3005;

app.listen(port, () => {
	logger.info (`Server runing in port ${port}...`);
});