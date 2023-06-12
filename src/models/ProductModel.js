import { Sequelize } from "sequelize";

import { Products } from "../models/database/tablesConnection.js";
import { SETTINGS } from "../const/settings.js";

export class ProductModel {
	constructor() {
    
	}

	create = async (body) => {
		const product = await Products.create({
			brand_name: body.brand_name,
			description: body.description,
			name: body.name,
			price: body.price,
			discount: body.discount,
			stock: body.stock,
		});

		return product;
	}

	delete = async (id) => {    
		const count = await Products.destroy({
			where: { id },
		});

		return count;
	}

	getOne = async (id) => {
		const product = await Products.findByPk(id, {
			attributes: {
				exclude: ["deleted_at"],
			},
		});

		return product;
	}

	getPage = async (params) => {
		const { page, q } = params;

		const products = await Products.findAll({
			attributes: {
				exclude: ["deleted_at"],
			},
			limit: SETTINGS.PAGE_LIMIT,
			offset: (page - 1) * SETTINGS.PAGE_LIMIT,
			order: [['created_at', 'DESC']],
			where: {
        description: {
          [Sequelize.Op.like]: q ? `%${q}%` : '%',
        },
      }
		});

		return products;
	}

	update = async (id, modifiedProduct) => {
		const count = await Products.update(modifiedProduct, {
			where: { id },
		});

		return count;
	}

	getStats = async () => {
        const stats = [];

        const now = new Date();
        const year = now.getFullYear();

        for (let i=0; i < MONTH_COUNT; i++) {
            const count  = await Products.count({
                where: {
                    created_at: {
                        [Op.and]: [
                            Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('created_at')), ),
                            Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('created_at')), year)
                        ]
                    },
                }
            });

            stats.push(count);
        }

        return stats;
    }
}