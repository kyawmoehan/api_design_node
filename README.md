# API Design in Node.js with Express

- [Informaton](#information)
- [Installation And Starting](#starting)
- [Requirement](#requirement)
- [Packages](#packages)
- [API Routes](#api)

## Infromation<a id="information"></a>
This project is a simple Express based API in node with express.Project includes REST API routes, individual user data storing using MongoDB and JWT token authorization. 
## Installation And Starting<a id="starting"></a>
Install dependencies:
```bash
$ npm install 
```
Start Server:
```bash
$ npm start 
```
Start Server with nodemon:
```bash
$ npm run dev
```
## Requirement
This project .env with dotenv package for MongoDB database URL and JWT key.
Include these variables in .env file:
```bash
DATABASE_URL={mongodb_url}
JWT_KEY={key for jwt token}
```
## Packages
These are packages used in project:
- bcrypt
- cors
- dotenv
- express
- jsonwebtoken
- mongoose
- morgan

Dev Dependencies:
- nodemon

## <a id="api"></a>API Routes

### Signup & Signin routes
```
/api/signup
```
Singup routes requires email and password
```
/api/signin
```
Signin routes requires email and password and token will be give back if user is correct

### Item routes
Note: `All item and list routes are protected, it will need headers authorization with token`
<br/>
```
GET /api/item
```
Get all the items for individual user
```
GET /api/item/{id}
```
Get the item with id
```
POST /api/item
```
Create an item and it will require name, status:optional, notes:optional , list:id
```
PUT /api/item/{id}
```
Update the item and it will require name, status:optional, notes:optional , list:id
```
DELETE /api/item/{id}
```
Delete the item with id

### List routes
```
GET /api/list
```
Get all the lists for individual user
```
GET /api/list/{id}
```
Get a list with id
```
POST /api/list
```
Create a list and it will require name, description:optional
```
PUT /api/list/{id}
```
Update the list and it will require name, description:optional
```
DELETE /api/list/{id}
```
Delete the list with id