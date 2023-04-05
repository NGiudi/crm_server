/* constants */
const { SETTINGS } = require("../const/settings");

async function getTableStats(model, page) {
	const totalUsers = await model.count();

	return {
		page: page,
		pages: Math.ceil(totalUsers / SETTINGS.PAGE_LIMIT),
		total: totalUsers,
	};
}


module.exports = {
	getTableStats,
};
