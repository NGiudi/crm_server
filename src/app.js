const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();

/* local configurations */
const logger = require("./utils/logger");

/* routes */
const usersRoutes = require("./routes/usersRoutes");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* routes in use. */
app.use("/users", usersRoutes);

/* init listen server in asigned port.*/
const port = process.env.PORT || 3005;

app.listen(port, () => {
	logger.info (`Server runing in port ${port}...`);
});