# Serveress Guru Tech Test

### Install Dependencies
- `npm i`

### Start Local Server
- `npm start` to run without Docker (make sure Dynamo is running locally on your machine)
- `docker compose up --build` to use the preconfigured services

### Run Integration Tests
- Make sure the server is running locally (see above)
- Run `npm test`

### Caveats
- Serverless Offline prepends the stage to every endpoint, so if you define a `GET /user` endpoint, when running it offline with a stage of `local`, it would actually be `GET /local/user`

### Example Requests

**Create User**
```shell
curl -v -H 'Content-Type: application/json' -H 'Accept: application/json' -X POST http://0.0.0.0:3001/dev/api/user -d '{"name": "Name", "email": "name@gmail.com", "dob": "01/01/1999"}'
```

**Update User**
```shell
curl -v -H 'Content-Type: application/json' -H 'Accept: application/json' -X PATCH http://0.0.0.0:3001/dev/api/user/{userId} -d '{"name": "New Name", "email": "new.name@email.com", "dob": "02/01/1999"}'
```

**Delete User**
```shell
curl -v -X DELETE http://0.0.0.0:3001/dev/api/{userId}
```

**Get User**
```shell
curl -v -X GET http://0.0.0.0:3001/dev/api/{userId}
```