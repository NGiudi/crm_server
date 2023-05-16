# Endpoints

## Create sale
  
  1. Crear una nueva venta:

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