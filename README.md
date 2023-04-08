# Lens Supply

Este repositorio contiene el backend de un sistema de gestión de inventario y ventas. Con el fin de mejorar la eficiencia y disminuir errores de una distribuidora de lentes de contacto.

### TODO List

1. agregarle a los endpoinst una whitelist de campos que se pueden recibir por el body.

## Features

### Login
  
  1. Crear usuario:

  Únicamente los usuarios administradores son capaces de crear usuarios.

  ```
    > POST `/users/signup`

    body: {
      "names": "Nicolás Martin",
      "last_name": "Giudice",
      "password": "pass1234",
      "email": "nicolas.m.giudice@gmail.com",
      "role": "admin"
    }
  ```
  
  2. Autenticar usuario logueado:
  ```
    > POST `/users/authentication`

    body: {
      "user_id": 1,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJ1c2VyX2lkIjoxLCJpYXQiOjE2ODA1NTkwMzB9hrfWi_EkN-tWNF36x-4u7hoDC_BOFdRPPauhpxQVUU4"
    }
  ```

  3. Iniciar sesión:
  ```
    > POST `/login`

    body: {
      "email": "nicolas.m.giudice@gmail.com",
      "password": "pass1234"
    }
  ```

  4. Cerrar sesión:
  ```
    > POST `/logout/:id`

  ```

### CRUD productos
  
  1. Obtener una página de productos:

  Únicamente los usuarios logueados pueden obtener el listado de productos.

  ```
    > GET `/products`

    body: {
      "page": 1
    }
  ```

  2. Obetener la información de un producto:

  Únicamente los usuarios logueados pueden obtener los datos de un producto.

  ```
    > GET `/products/:id`
  ```
  
  3. Modificar la información de un producto:

  Únicamente los usuarios logueados pueden modificar los datos de un producto.
    
  ```
    > PUT `/products/:id`
  
    body: {
      "brand_name": "Marca 1",
      "name": "Producto 1",
      ...
    }
  ```

  4. Eliminar un producto:
  
  Únicamente los usuarios logueados pueden eliminar un producto.

  Se hace soft delete para mantener consistencia en la información del sistema de gestión.

  ```
    > DELETE `/products/:id`
  ```

### CRUD Usuarios
  
  1. Obtener una página de usuarios:

  Únicamente los usuarios administradores pueden obtener el listado de usuarios.

  ```
    > GET `/users`

    body: {
      "page": 1
    }
  ```

  2. Obetener la información de un usuario:

  Únicamente los usuarios administradores pueden obtener los datos de un usuario.

  ```
    > GET `/users/:id`
  ```
  
  3. Modificar la información de un usuario:

  Únicamente los usuarios administradores pueden modificar los datos de los usuarios.
    
  ```
    > PUT `/users/:id`
  
    body: {
      "names": "Nicolás M",
      ...
    }
  ```

  4. Eliminar un usuario:
  
  Únicamente los usuarios administradores pueden eliminar un usuario.

  Se hace soft delete para mantener consistencia en la información del sistema de gestión.

  ```
    > DELETE `/users/:id`
  ```

### Roles para usuarios
El sitema cuenta con un sistema de permisos que contiene 2 roles:

1. Administradores (admin): Este usuario tiene permisos para acceder a todos los endpoints del sistema.

2. Vendedores (seller): Los vendedores no tienen permiso para acceder a los endpoint de usuarios, estos son exclusivos para los administradores.

## ¿Cómo iniciar el proyecto?

1. Crear un archivo `.env` en la raiz del proyecto y agregar las siguientes variables de entorno:

```
DB_HOST = "localhost"
DB_NAME = "lens_supply"
DB_PASSWORD = ""
DB_USER = "root"

JWT_KEY = "secret_key"

PORT = "3005"
```

2. Instalar dependencias

```
npm i
```

3. Iniciar proyecyo

```
npm start
```

### Roles para usuarios
El sitema cuenta con un sistema de permisos que contiene 2 roles:

1. Administradores (admin): Este usuario tiene permisos para acceder a todos los endpoints del sistema.

2. Vendedores (seller): Los vendedores no tienen permiso para acceder a los endpoint de usuarios, estos son exclusivos para los administradores.

## ¿Cómo iniciar el proyecto?

1. Crear un archivo `.env` en la raiz del proyecto y agregar las siguientes variables de entorno:

```
DB_HOST = "localhost"
DB_NAME = "lens_supply"
DB_PASSWORD = ""
DB_USER = "root"

JWT_KEY = "secret_key"

PORT = "3005"
```

2. Instalar dependencias

```
npm i
```

3. Iniciar proyecyo

```
npm start
```

## Cliente

Em este repositorio se encuentra subida la parte del servidor, para ver la parte del cliente debe dirigirse al siguiente repositorio:
TODO: Agregar link.
