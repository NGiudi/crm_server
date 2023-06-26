# Endpoints

## Login
  
  1. Endpoint: POST `/users/signup`

  Descripción:
    Este endpoint se utiliza para crear un usuario.

  Autenticación:
    Es necesario estar autenticado, tener el rol de administrador y ser un 
    usuario activo para acceder a este endpoint.

  Respuestas:
    201 (Created): Si la autenticación es exitosa, no retorna ningún
    valor.

    409 (Conflict): Si el usuario ya existe.

    500 (Internal Server Error): Si ocurre un error en el servidor.

  ```
    > POST `/users/signup`

    body: {
      "names": "Nicolás Martin",
      "last_name": "Giudice",
      “phone”: “1234567890”,
      "password": "pass1234",
      "email": "nicolas.m.giudice@gmail.com",
      "role": "admin"
      "active": true
    }
  ```
  
  2. Endpoint: POST `/users/authentication`

  Descripción:
    Este endpoint se utiliza para autenticar un usuario mediante su 
    token y ID de usuario.

  Autenticación:
    Sin autenticación.

  Parámetros de consulta:
    token (obligatorio): El token de autenticación del usuario.
    user_id (obligatorio): El ID del usuario que se va a autenticar.

  Respuestas:
    200 (OK): Si la autenticación es exitosa, retorna un objeto JSON 
    con el usuario. El objeto usuario contiene todos los campos de la 
    tabla Usuarios excepto deleted_at, password y token.

    400 (Bad Request): Si el token o el user id no fueron enviados o
    están vacíos.

    401 (Bad Request): Si el usuario no está activo.

    404 (Not Found): Si el usuario no existe.

    500 (Internal Server Error): Si ocurre un error en el servidor.

  ```
    > POST `/users/authentication`

    body: {
      "user_id": 1,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJ1c2VyX2lkIjoxLCJpYXQiOjE2ODA1NTkwMzB9hrfWi_EkN-tWNF36x-4u7hoDC_BOFdRPPauhpxQVUU4"
    }
  ```

  3. Endpoint: POST `/login`

  Descripción:
    Permite a un usuario autenticarse en el sistema y generar un token 
    para usar en futuras solicitudes.

  Autenticación:
    Sin autenticación.

  Parámetros de entrada:
    email (obligatorio): String -> El email del usuario.
    password (obligatorio): String -> La contraseña del usuario.

  Respuestas:
    200 (OK): Si la autenticación es exitosa, retorna un objeto JSON 
    con el usuario y el token generado. El objeto usuario contiene todos 
    los campos de la tabla Usuarios excepto deleted_at, password y
    token.

    400 (Bad Request): Si el email o la contraseña no fueron enviados o
    están vacíos.

    401 (Unauthorized): Si el email no existe, la contraseña es incorrecta o 
    el usuario no está activo.

    500 (Internal Server Error): Si ocurre un error en el servidor.

  ```
    > POST `/login`

    body: {
      "email": "nicolas.m.giudice@gmail.com",
      "password": "pass1234"
    }
  ```

  4. Endpoint: POST `/logout`

  Descripción:
    Permite a un usuario eliminar el token de sesión asociado a ese usuario. 

  Autenticación:
    Sin autenticación.

  Parámetros de entrada:
    id: El ID del usuario a desloguear.

  Respuestas:
    200 (OK): Si la autenticación es exitosa, no retorna ningún
    valor.

    404 (Not Found): Si el usuario no existe.

    500 (Internal Server Error): Si ocurre un error en el servidor.

  ```
    > POST `/logout/:id`

  ```

## CRUD Usuarios
  
  1. Endpoint: GET `/users`

  Descripción:
    Este endpoint permite obtener una lista de todos los usuarios 
    registrados en la aplicación.

  Autenticación:
    Es necesario estar autenticado, tener el rol de administrador y ser un 
    usuario activo para acceder a este endpoint.

	Parámetros de consulta:
    page: página que se debe devolver.

  Respuestas:
    200 (OK): Si la autenticación es exitosa, retorna un objeto JSON 
    con la lista de todos los usuarios. El objeto usuario contiene 
    todos los campos de la tabla Usuarios excepto deleted_at, 
    password y token.

    500 (Internal Server Error): Si ocurre un error en el servidor.

  ```
    > GET `/users`

    body: {
      "page": 1
    }
  ```

  2. Endpoint: GET `/users/:id`
  
  Descripción:
    Este endpoint permite obtener información detallada de un usuario 
    específico por su ID.

  Autenticación:
    Es necesario estar autenticado, tener el rol de administrador y ser un 
    usuario activo para acceder a este endpoint.
  
  Parámetros de consulta:
    id: El ID del usuario a buscar.

  Respuestas:
    200 (OK): Si la autenticación es exitosa, retorna un objeto JSON 
    con el usuario. El objeto usuario contiene todos los campos de la 
    tabla Usuarios excepto deleted_at, password y token.

    404 (Not Found): Si el usuario no existe.
		
		500 (Internal Server Error): Si ocurre un error en el servidor.

  ```
    > GET `/users/:id`
  ```
  
  3. Endpoint: PUT `/users/:id`

  Descripción:
    Este endpoint te permite actualizar la información de un usuario en 
    particular a través de su ID, excluyendo el token y el password.

  Autenticación:
    Es necesario estar autenticado, tener el rol de administrador y ser un 
    usuario activo para acceder a este endpoint.
  
  Parámetros de consulta:
    id: El ID del usuario a actualizar.

  Respuestas:
    200 (OK): Si la autenticación es exitosa, retorna un objeto JSON 
    con el usuario. El objeto usuario contiene todos los campos de la 
    tabla Usuarios excepto deleted_at, password y token.

    404 (Not Found): Si el usuario no existe.

    500 (Internal Server Error): Si ocurre un error en el servidor.
    
  ```
    > PUT `/users/:id`
  
    body: {
      "names": "Nicolás M",
      ...
    }
  ```

  4. Endpoint: DELETE `/users/:id`

  Descripción:
    Este endpoint permite eliminar un usuario específico por su ID.

  Autenticación:
    Es necesario estar autenticado, tener el rol de administrador y ser un 
    usuario activo para acceder a este endpoint.

  Parámetros de consulta:
    id: El ID del usuario a eliminar.

  Respuestas:
    204 (Not Content): Si la autenticación es exitosa, no retorna ningún
  	valor.

    404 (Not Found): Si el usuario no existe.

    500 (Internal Server Error): Si ocurre un error en el servidor.

  ```
    > DELETE `/users/:id`
  ```