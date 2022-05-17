# API Endpoint
- Nanti pakai heroku untuk tahap development

# API List

## SignUp User
- URL
  - /user
- Method
  - POST
- Request body
  - name (string)
  - email (string)
  - password (string)
  - fpassword (string)
  - phone_number (string)
  - role (string)
- Response 
```
{
  "message": "Register Berhasil"
}
```

## Login User
- URL
  - /login
- Method
  - POST
- Request body
  - email (string)
  - password (string)
- Response
```
{
    "message": "Login Berhasil",
    "dataUser": {
        "id_user": "-N20lzx77Fj4_FEhgger"
    }
}
```

## Edit Profile User
- URL
  - /user/:user_id
- Method
  - PATCH
- Request body
  - name_user (string)
  - profile_pict (string)
- Response
```
{
    "message": "Success Edit Profile User"
}
```

## Get All User Friend and Group Contact
- URL
  - /user/:user_id
- Method
  - GET
- Request body
  - none
- Response
```
{
    "message": "Success get friend and group",
    "snapshot": {
        "contact": {
            "-N2BFGPSRgj72G_GICYD": {
                "emailFriend": "yusuf@gmail.com",
                "nameFriend": "yusuf"
            },
            "-N2BIgpoSCy6PSVhazPH": {
                "nameGroup": "RedTeam"
            }
        },
        "email": "richard@gmail.com",
        "name": "richard",
        "password": "$2b0$x9flA79G77QpgfU2IKPbUeIVwO7JN0mXQ9bz/CzddYb6U0NKvgJT.",
        "phone_number": "342525345",
        "profile_pict": "aarhga",
        "role": "accounting"
    }
}
```

## Add new friend in User Contact
- 
