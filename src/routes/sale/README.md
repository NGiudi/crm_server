# Endpoints

## CRUD Sales
  
  1. Endpoint: POST `/`

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

  ```
    > POST `/`

    body: {
      "items": [{
          product_id: 1,
          quantity: 1,
        }, 
        {
          product_id: 2,
          quantity: 1,
        }
      ]
    }
  ```