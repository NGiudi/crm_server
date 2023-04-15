const router = require("express").Router();

/* middlewares */
const { authLoggedInUser } = require("../../middlewares/auth");

/* utils */
const { getTableStats } = require("../../utils/tables");

/* models */
const { Products } = require("../../models/connectionsModel");

/* constants */
const { MESSAGES } = require("../../const/responses");
const { SETTINGS } = require("../../const/settings");

/**
  Endpoint: GET `/products`

  Descripción:
    Este endpoint permite obtener una lista de todos los productos 
    registrados en la aplicación.
  
	Parámetros de consulta:
    * page: página que se debe devolver.

  Respuestas:
    * 200 (OK): retorna un objeto JSON con la lista de una página de 
      productos. El objeto producto contiene todos los campos de la 
      tabla Productos excepto deleted_at.

    * 500 (Internal Server Error): Si ocurre un error en el servidor.
*/
router.get("/", authLoggedInUser(), async (req, res) => {
	const page = req.body.page || 1;

	try {
		const products = await Products.findAll({
			attributes: {
				exclude: ["deleted_at"],
			},
			limit: SETTINGS.PAGE_LIMIT,
			offset: (page - 1) * SETTINGS.PAGE_LIMIT,
		});

		const stats = await getTableStats(Products, page);

		return res.status(200).json({ products, stats });
	} catch {
		res.status(500).json();
	}
});

/**
  Endpoint: GET `/products/:id`
  
  Descripción:
    Este endpoint permite obtener información detallada de un producto 
    específico por su ID.
  
  Parámetros de consulta:
    * id: El ID del producto a buscar.

  Respuestas:
    * 200 (OK): Retorna un objeto JSON con el producto. El objeto producto 
      contiene todos los campos de la tabla Producto excepto deleted_at.

    * 404 (Not Found): Si el producto no existe.

    * 500 (Internal Server Error): Si ocurre un error en el servidor.
*/
router.get("/:id", authLoggedInUser(), async (req, res) => {
	try {
		const product = await Products.findByPk(req.params.id, {
			attributes: { 
				exclude: ["deleted_at"],
			},
		});

		if (product)
			return res.status(200).json(product);

		return res.status(404).json({ message: MESSAGES.PRODUCT_NOT_FOUND });  		
	} catch {
		return res.status(500).json();
	}
});

/**
  Endpoint: PUT `/products/:id`

  Descripción:
    Este endpoint te permite actualizar la información de un producto en 
    particular a través de su ID.

  Parámetros de consulta:
    * id: El ID del producto a actualizar.

  Respuestas:
    * 200 (OK): Retorna un objeto JSON con el producto. El objeto producto
      contiene todos los campos de la tabla Productos excepto deleted_at.

    * 404 (Not Found): Si el producto no existe.

    * 500 (Internal Server Error): Si ocurre un error en el servidor.
*/
router.put("/:id", authLoggedInUser(), async (req, res) => {
	try {
		const product = await Products.findByPk(req.params.id, {
			attributes: { 
				exclude: ["deleted_at"],
			},
		});

		if (!product)
			return res.status(404).json({ message: MESSAGES.PRODUCT_NOT_FOUND });

		// update product fields.
		Object.assign(product, req.body);
		await product.save();

		return res.json({ product });
	} catch {
		return res.status(500).json();
	}
});

/**
  Endpoint: DELETE `/users/:id`

  Descripción:
    Este endpoint permite eliminar un producto específico por su ID.

  Parámetros de consulta:
    * id: El ID del producto a eliminar.

  Respuestas:
    * 204 (Not Content): Si la autenticación es exitosa, no retorna ningún
      valor.

    * 404 (Not Found): Si el producto no existe.

    * 500 (Internal Server Error): Si ocurre un error en el servidor.
*/
router.delete("/:id", authLoggedInUser(),  async (req, res) => {
	try {
		const product = await Products.destroy({
			where: { id: req.params.id },
		});

		if (!product)
			return res.status(404).json({ message: MESSAGES.PRODUCT_NOT_FOUND });
    
		return res.status(204).json();
	} catch {
		return res.status(500).json();
	}
});

module.exports = router;