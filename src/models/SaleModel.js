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

  getPage = async (page) => {
    const sales = await Sales.findAll({
			attributes: {
				exclude: ["deleted_at"],
			},
      include: [{ 
				attributes:["id", "names", "last_name"],	
				model: Users,
			}],
			limit: SETTINGS.PAGE_LIMIT,
			offset: (page - 1) * SETTINGS.PAGE_LIMIT,
		});

    return sales;
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

  //TODO: preguntarle al profe si esto no debería ser parte del modelo de producto.
  updateStock = async (productSale) => {
    const updatedFields = { 
      stock: Sequelize.literal(`stock - ${productSale.quantity}`)
    };

    const count = await Products.update(updatedFields, {
      where: { id: productSale.product_id },
    });

    return count;
  }
}