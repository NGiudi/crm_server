const { Products } = require("../connectionsModel");

class SaleDao {

  constructor() {

  }

  async #haveProductStock(product) {
    const p = await Products.findByPk(product.id, {
      attributes: ["id", "stock"],
    });

    return product.quantity <= p.stock;
  }

  async #allProductsHaveStock(productsList) {
    for (let i = 0; i < productsList.length; i++) {
      const haveStock = await this.#haveProductStock(productsList[i]);

      if (!haveStock)
        return false;
    }

    return true;
  }

  createSale(items) {
    //TODO: agregar la lógica de venta.
    return this.#allProductsHaveStock(items);
  }
}

module.exports = SaleDao;