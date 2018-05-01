# nodejs-rest-api-mysql
**A node.js API server for MySQL** - It can perform CRUD (Create, Read, Update, Delete) operations using HTTP Methods (POST, GET, PUT, and DELETE) for RESTful Services.

- RESTful
- Basic API Authentication
- SQL Injection cleaning
- Pagination Support
- Easy to setup

##Configure
```javascript
config.port = 3000;

//Authentication
config.auth = false;

- `auth` when true, enables HTTP Basic Authentication for the API. The username and password is stores in a file `keys.htpasswd`, which is in the format `username:password`


##Create (POST)
Create a new entry in the table with the parameters that are posted.

```
POST http://www.example.com/api/table_name
```
**Response**
- If the row is created :
```json
{
  "success": 1,
  "id": inserted_id
}
```
- If parameters are missing :
```json
{
  "success": 0,
  "message": "Parameters missing"
}
```

##Read (GET)
Reads data from table.

- Read Entire Table
```
GET http://www.example.com/api/table_name
```
- Read by ID
```
GET http://www.example.com/api/table_name/id
```
**Response**
- If data exsists :
```json
{
  "success": 1,
  "data": "..."
}
```
- If data missing :
```json
{
  "success": 0,
  "message": "No rows found"
}
```

##Update (PUT)
Update an entry in the table with the parameters that are put.

```
PUT http://www.example.com/api/table_name/id
```
**Response**
- If the row is updated :
```json
{
  "success": 1,
  "message": "Updated"
}
```
- If parameters are missing :
```json
{
  "success": 0,
  "message": "Parameters missing"
}
```

##Delete (DELETE)
Delete an entry in the table.

```
DELETE http://www.example.com/api/table_name/id
```
**Response**
- If the row is deleted :
```json
{
  "success": 1,
  "message": "Deleted"
}
```

##Pending Features
- Security Features
- Find by field
- and more! :)

##Thank you.
Arjun | arjunkomath@gmail.com
