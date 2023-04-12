# Endpoints

## Login
  
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

## CRUD Usuarios
  
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