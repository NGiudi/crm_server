/* constants */
const { SETTINGS } = require("../const/settings");

async function getTableStats(model, page, options) {
	const totalUsers = await model.count(options);

	return {
		page: page,
		pages: Math.ceil(totalUsers / SETTINGS.PAGE_LIMIT),
		total: totalUsers,
	};
}


module.exports = {
	getTableStats,
};
