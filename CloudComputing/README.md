# API Endpoint
- Nanti pakai heroku untuk tahap development atau langsung pakai App engine

# API List
masih dalam tahap development (bisa berubah)

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
- URL
  - /user/:user_id
- Method
  - POST
- Request body
  - email (string) --> email temen yang mau di accept
- Response 
```
{
    "message": "Register Berhasil",
    "id_chat": "-N2FfiXoQXQF2uOs4-Hb"
}
```

## Add new Group
- URL
  - /user/:user_id/group
- Method
  - POST
- Request body
  - id_user (string)
  - email_user (string)
  - name (string) --> nama group baru
- Response
```
{
    "message": "Add new group success",
    "id_group": "-N2Fh7kmJ26graL3LPVd"
}
```

## Edit Group
- URL
  - /user/:user_id/group/:group_id
- Method
  - POST
- Request body
  - name (string) --> nama group baru
  - group_pict (string)
- Response body
```
{
    "message": "Success Edit Profile Group"
}
```

## Add friend to Group
- URL
  - /user/:user_id/group/:group_id
- Method
  - POST
- Request body
  - nameGroup (string)
  - emailFriend (string)
- Response body
```
{
    "message": "Add yusuf@gmail.com to RedTeam group success"
}
```

## Add feedback
- URL
  - /user/:user_id/feedback/
- Method
  - POST
- Request body
  - id_user (string)
  - feedback (string)
- Response
```
{
    "message": "Feedback kamu: aplikasi ini lumayan bagus mungkin bisa ditambah performa di realtime chatnya"
}
```

## Get Realtime Chat

## Send Chat




