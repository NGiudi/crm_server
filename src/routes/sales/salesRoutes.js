const router = require("express").Router();

/* middlewares */
const { authLoggedInUser } = require("../../middlewares/auth");

/* models */
const SaleDao = require("../../models/DAOs/saleDao");

/* constants */
const { MESSAGES } = require("../../const/responses");

/*
  Endpoint: POST `/`

  Descripción:
    Permite a un usuario crear una venta que contiene una lista de
    productos, antes de concretarlo se valida que haya stock de los
    productos. 

  Autenticación:
    Usuario logueado.

  Parámetros de entrada:
    items: Listado de productos.

  Respuestas:
    200 (OK): Si la autenticación es exitosa, no retorna ningún
    valor.

    500 (Internal Server Error): Si ocurre un error en el servidor.
*/
router.post("/", authLoggedInUser(), async (req, res) => {
	const { items } = req.body;

  if (!items || items.length === 0)
    return res.status(400).json({ message: MESSAGES.SALE_REQUIRED_FIELDS });

  try {
    const sale = new SaleDao();
    
    if (sale.createSale(items)) {
      return res.status(200).json({ message: MESSAGES.SALE_CREATED });
    }

    return res.status(400).json({ message: MESSAGES.SALE_WITHOUT_STOCK });
	} catch (err) {
    console.error(err);
		return res.status(500).json();
	}
});

module.exports = router;