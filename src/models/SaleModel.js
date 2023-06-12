import Sequelize from "sequelize";

import { Products, ProductsSale, Sales, Users } from "./database/tablesConnection.js";
import { SETTINGS } from "../const/settings.js";

export class SaleModel {
  constructor() {

  }

  create = async (saleObj) => {
    const sale = await Sales.create(saleObj);
    return sale;
  }

  createProductSale = async (productSaleObj) => {
    const productSale = await ProductsSale.create(productSaleObj);
    return productSale;
  }

  getOne = async (id) => {
    const sale = await Sales.findByPk(id, {
			include: [{ 
				attributes: ["id","names","last_name"],
				model: Users,
			}],
		});

    return sale;
  }

  getPage = async (params) => {
    const { page, seller_id } = params;

    let queryObj = {
			attributes: {
				exclude: ["deleted_at"],
			},
      include: [{ 
				attributes:["id", "names", "last_name"],	
				model: Users,
			}],
			limit: SETTINGS.PAGE_LIMIT,
			offset: (page - 1) * SETTINGS.PAGE_LIMIT,
      order: [['created_at', 'DESC']],
		};

    if (seller_id)
      queryObj.where = { seller_id: seller_id };

    const salesObj = await Sales.findAndCountAll(queryObj);

    return salesObj;
  }

  getProductsSaleOfSale = async (id) => {
    const productsSales = await ProductsSale.findAll({	
			include: [{ 
				attributes:["brand_name", "description", "id", "name", "price"],
				model: Products,
			}],
      where: { sale_id: id },
		});

    return productsSales;
  }

  updateStock = async (productSale) => {
    const updatedFields = { 
      stock: Sequelize.literal(`stock - ${productSale.quantity}`)
    };

    const count = await Products.update(updatedFields, {
      where: { id: productSale.product_id },
    });

    return count;
  }

  getStats = async (sellerId) => {
    const stats = {
      sales: [],
      grossProfit: [],
      sellerSales: [],
      sellerGrossProfit: []
    };
  
    const now = new Date();
    const year = now.getFullYear();
  
    for (let i = 1; i <= SETTINGS.MONTH_COUNT; i++) {
      const count = await Sales.count({
        where: {
          created_at: {
            [Sequelize.Op.and]: [
              Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('created_at')), i),
              Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('created_at')), year)
            ]
          },
        }
      });
  
      const sum = await Sales.sum('price', {
        where: {
          created_at: {
            [Sequelize.Op.and]: [
              Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('created_at')), i),
              Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('created_at')), year)
            ]
          },
        }
      });
  
      const sellerCount = await Sales.count({
        where: {
          seller_id: sellerId,
          created_at: {
            [Sequelize.Op.and]: [
              Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('created_at')), i),
              Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('created_at')), year)
            ]
          },
        }
      });

      const sellerSum = await Sales.sum('price', {
        where: {
          seller_id: sellerId,
          created_at: {
            [Sequelize.Op.and]: [
              Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('created_at')), i),
              Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('created_at')), year)
            ]
          },
        }
      });
  
      stats.sales.push(count);
      stats.grossProfit.push(sum);
      stats.sellerSales.push(sellerCount);
      stats.sellerGrossProfit.push(sellerSum);
    }
    return stats;
  }
}