# API Documentation

## Endpoints
- [Register](#Register)
- [Authenticate](#Authenticate)
- [Get user](#Get-user)

### Register

Register a new user.
```endpoint
POST /register
```

#### Example request body

```json
{
  "name": "foo",
  "email": "email@example.com",
  "password": "bar"
}
```

Property | Description | Rules
---|---|---
`name` | The user name | required, string
`email` | The user email | required, string
`password` | The user password | required, string

#### Example response

```json
{
  "user": {
    "_id": "5d940dbe1fffb325a10840fb",
    "email": "email@example.com",
    "name": "foo",
    "createdAt": "2019-10-02T02:38:54.292Z"
  }
}
```

### Authenticate

Returns the user info and the JWT token.
```endpoint
POST /authenticate
```

#### Example request body

```json
{
  "email": "email@example.com",
  "password": "bar"
}
```

Property | Description | Rules
---|---|---
`email` | The user email | required, string
`password` | The user password | required, string

#### Example response

```json
{
  "user": {
    "_id": "5d940dbe1fffb325a10840fb",
    "email": "email@example.com",
    "name": "foo",
    "createdAt": "2019-10-02T02:38:54.292Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOTQwZGJlMWZmZmIzMjVhMTA4NDBmYiIsImlhdCI6MTU2OTk4NDI4OCwiZXhwIjoxNTcwMDcwNjg4fQ.jOQhNmaYiyx-qV3VFhSPiicWevAwBpnd64pm6rqOsb4"
}
```

### Get user

Returns the logged user info. (Requires Authorization header)
```endpoint
GET /me
```
This route requires an authorization header

#### Example request header

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOTQwZGJlMWZmZmIzMjVhMTA4NDBmYiIsImlhdCI6MTU2OTk4NDI4OCwiZXhwIjoxNTcwMDcwNjg4fQ.jOQhNmaYiyx-qV3VFhSPiicWevAwBpnd64pm6rqOsb4"
}
```

#### Example response

```json
{
  "user": {
    "_id": "5d940dbe1fffb325a10840fb",
    "email": "email@example.com",
    "name": "foo",
    "createdAt": "2019-10-02T02:38:54.292Z"
  }
}
```
