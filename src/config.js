//? Database configuration.
import dotenv from "dotenv";
import Sequelize from "sequelize";

dotenv.config();

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	define: {
		freezeTableName: true,
		alter: true
	},
	dialect: "mysql",
	host: process.env.DB_HOST,
	logging: false
});

sequelize.sync({force: false})
	.then(() => console.log("Sincronizated table!"))
	.catch ((err) => console.log(`Table synchronization failed! ${err}`));