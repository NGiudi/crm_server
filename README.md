# Lens Supply - Backend

Este repositorio contiene el backend de un sistema de gestión de inventario y ventas. Con el fin de mejorar la eficiencia y disminuir errores de una distribuidora de lentes de contacto.

### TODO List

1. agregarle a los endpoinst una whitelist de campos que se pueden recibir por el body.

2. Los updates y delete pueden modificar o eliminar más de un elemento de una vez, ahora el count solo tiene en cuenta que se elimina 1 elemento. Modificar esto para que soperte multiples eliminaciones correctamente.

## Features

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

https://github.com/NGiudi/crm_client