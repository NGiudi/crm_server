/* constants */
import { SETTINGS } from "../const/settings.js";

export class TableUtils {
	static async getTableStats(model, page, options) {
		const totalUsers = await model.count(options);
	
		return {
			page: page,
			pages: Math.ceil(totalUsers / SETTINGS.PAGE_LIMIT),
			total: totalUsers,
		};
	}

	static getPaginationStats(page, count) {
		return {
			page: page,
			pages: Math.ceil(count / SETTINGS.PAGE_LIMIT),
			total: count,
		};
	}
} 