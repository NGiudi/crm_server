# Endpoints

## CRUD productos
  
  1. Endpoint: GET `/products`
	
		Descripción:
			Este endpoint permite obtener una lista de todos los productos 
			registrados en la aplicación.
	
		Parámetros de consulta:
			page: página que se debe devolver.

		Respuestas:
			200 (OK): retorna un objeto JSON con la lista de una página de 
			productos. El objeto producto contiene todos los campos de la 
			tabla Productos excepto deleted_at.

			500 (Internal Server Error): Si ocurre un error en el servidor.

  ```
    > GET `/products`

    body: {
      "page": 1
    }
  ```

  2. Endpoint: GET `/products/:id`
		
		Descripción:
			Este endpoint permite obtener información detallada de un producto 
			específico por su ID.
		
		Parámetros de consulta:
			id: El ID del producto a buscar.

		Respuestas:
			200 (OK): Retorna un objeto JSON con el producto. El objeto producto 
			contiene todos los campos de la tabla Producto excepto deleted_at.

			404 (Not Found): Si el producto no existe.

			500 (Internal Server Error): Si ocurre un error en el servidor.

  ```
    > GET `/products/:id`
  ```
  
  3. Endpoint: PUT `/products/:id`

		Descripción:
			Este endpoint te permite actualizar la información de un producto en 
			particular a través de su ID.

		Parámetros de consulta:
			id: El ID del producto a actualizar.

		Respuestas:
			200 (OK): Retorna un objeto JSON con el producto. El objeto producto
			contiene todos los campos de la tabla Productos excepto deleted_at.

			404 (Not Found): Si el producto no existe.

			500 (Internal Server Error): Si ocurre un error en el servidor.

  ```
    > PUT `/products/:id`
  
    body: {
      "brand_name": "Marca 1",
      "name": "Producto 1",
      ...
    }
  ```

  4. Endpoint: DELETE `/users/:id`

		Descripción:
			Este endpoint permite eliminar un producto específico por su ID.

		Parámetros de consulta:
			id: El ID del producto a eliminar.

		Respuestas:
			204 (Not Content): Si la autenticación es exitosa, no retorna ningún
			valor.

			404 (Not Found): Si el producto no existe.

			500 (Internal Server Error): Si ocurre un error en el servidor.

  ```
    > DELETE `/products/:id`
  ```