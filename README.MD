# Template for express and TypeORM

This template serves as a setup for express and typeorm application. It uses sqlite as the database and for validation it uses [joi](https://www.npmjs.com/package/joi) and [express-joi](https://www.npmjs.com/package/express-joi-validation)

### Folder structure

```bash
src
├── app-data-source.ts # typeorm data source setup 
├── entity # Folder for entities
│   └── User.ts # User entity
├── index.ts # application code
└── schema # Folder for schemas
    └── UserSchema.ts # User Schema
```


## Usage

To use this application run the code below to start up the server:

```code
npm i # install dependencies
npm run start
```

## Endpoints

The following endpoints are available and can be used via any http client.

### `GET` /users

Endpoint to retrieve all users in the database.

```code
curl -X GET localhost:3000/users
```

### `GET` /users/:id

Endpoint to retrieve one user by id 

```code
curl -X GET localhost:3000/users
```

### `POST` /users

Endpoint to add new user to the database

```code
curl -X POST localhost:3000/users -H 'Content-Type: application/json' -d '{"firstName": "Eteimorde", "lastName": "Youdiowei"}'
```

### `PUT` /users/:id

Endpoint to update a particular user

```code
curl -X PUT localhost:3000/users/1 -H 'Content-Type: application/json' -d '{"firstName": "Eteims"}'
```

### `DELETE` /users/:id

Endpoint to delete user

```code
curl -X DELETE localhost:3000/users/1
```