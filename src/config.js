//? Database configuration.
const Sequilize = require("sequelize");

const sequilize = new Sequilize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	define: {
		freezeTableName: true,
		alter: true
	},
	dialect: "mysql",
	host: process.env.DB_HOST,
	logging: false
});

sequilize.sync({force: false})
	.then(() => console.log("Sincronizated table!"))
	.catch ((error) => console.log(`Table synchronization failed! ${error}`));

module.exports = sequilize;