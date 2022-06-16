# Getting Started for Cloud Computing Resources


# API Endpoint

- CE Backend-App:
  - https://mydomainappalvin.com
- App Engine Backend-Admin:
  - https://bangkitproject-348609.et.r.appspot.com
- CE Frontend:
  - https://redteam-chatapp.vercel.app/
- CE ML-Flask:
  - https://ml.mydomainappalvin.com

# API List

1. [Login User](#login-user)
2. [sign up](#singup-user)
3. [Get Profile User for Setting](#get-profile-user-for-setting)
4. [Add new Friend as PC](#add-new-friend-as-pc)
5. [Edit Profile User](#edit-profile-user)
6. [Realtime Chat PC](#realtime-chat-pc-only-img)
7. [Add New Group](#add-new-group)
8. [Get Group Specs](#get-group-specs)
9. [Add friend to Group](#add-friend-to-group)
10. [Edit Group](#edit-group)
11. [Out from group](#out-from-group)
12. [Realtime Chat Group](#realtime-chat-group)
13. [Add feedback](#add-feedback)
14. [Get Announcement by specific division](#get-announcement-by-specific-division)
15. [Translate](#translate)

Admin Only
1. [Login Website](#login-website)
2.  

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
    "code": 1,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiItTjN4WEpwbzRiaC03aXEyYjNSOSIsImlhdCI6MTY1NDg1NDczMX0.qPY6kgCMyuDOqLWd2aUe7shtEAA169TQ_vJNgrH6MFA",
    "dataUser": {
        "id_user": "-N20lzx77Fj4_FEhgger"
    }
}
```

- Message Code
  - 0 == Internal Server Error
  - 1 == Login Berhasil
  - 2 == Email atau Password Salah
  - 3 == Akun belum diapprove oleh Admin

## SignUp User

- URL
  - /user
- Method
  - POST
- Request body
  - name (string)
  - posisi (string)
  - divisi_kerja (string)
  - email (string)
  - password (string)
  - fpassword (string)
  - phone_number (string)
- Response

```
{
  "message": "Register Berhasil",
  "code": 1
}
```

- Message Code
  - 0 == Internal Server Error
  - 1 == Register Berhasil
  - 2 == Email sudah Terdaftar!
  - 3 == Error when store in database

# User API

## Get Profile User for Setting
- URL
  - /user/:user_id
- Method
  - GET
- Request header
  - token
  - id
- Response
```
{
    "message": "Success get Profile User",
    "snapshot": {
        "about": "Available",
        "approve": true,
        "contact": {
            "-N4VpC6kLmTn70uyhbQ0Galih-farouqPC": {
                "id_chat": "-N4VpC6kLmTn70uyhbQ0Galih-farouqPC",
                "id_friend": "-N4CxyXWfmo6ky5lFWSY",
                "name": "farouq",
                "pict": "https://storage.googleapis.com/bangkit_chatapp_bucket/UserPict/default_pict/F.png"
            }
        },
        "divisi_kerja": "Call Center",
        "email": "galih8.4.2001@gmail.com",
        "name": "Galih",
        "password": "$2b$10$dw.8EIcWwD9V71hzYRxB9.VBlVeBrQHgQ7kqJktAf8/GJ.TAa5xfS",
        "phone_number": "353445",
        "posisi": "admin",
        "profile_pict": "https://storage.googleapis.com/bangkit_chatapp_bucket/UserPict/2022-5-7-1654594817330masker.png",
        "timestamp": "06/07/2022"
    },
    "code": 1
}
```

- Message Code
  - 0 == Internal Server Error
  - 1 == Success get Profile User

## Add new friend as PC

- URL
  - /user/:user_id
- Method
  - POST
- Request header
  - token
  - id
- Request body
  - email (string) --> email temen yang mau di accept
- Response

```
{
    "message": "Add Friend Success",
    "id_chat": "-N4IcjyO-AjUH1hY-qB6Richard-farouqPC",
    "id_friend": "-N3gOIVFClT_n4DWgvVJ",
    "nameFriend": "farouq",
    "code": 1
}
```

- Message Code
  - 0 == Internal Server Error
  - 1 == Add Friend Success
  - 2 == Email yang Dicari Tidak Ada!
  - 3 == Friend sudah ada didaftar contact
  - 4 == Error when insert new contact friend

## Edit Profile User

- URL
  - /user/:user_id
- Method
  - PATCH
- Request header
  - token
  - id
- Request body
  - phone_number (string)
  - about (string)
  - profile_pict (file)
- Response

```
{
    "message": "Success Edit Profile User",
    "code": 1
}
```
- Message Code
  - 0 == Internal Server Error
  - 1 == Success Edit Profile User
  - 2 == Error when update user profile


## Realtime Chat PC only image

- URL
  - /user/:user_id/chat/:chat_id
- Method
  - POST
- Request header
  - token
  - id
- Request body
  - file (file)
- Response

```
{
    "message": "Success send chat"
}
```

# Group API

## Add new Group

- URL
  - /user/:user_id/group
- Method
  - POST
- Request header
  - token
  - id
- Request body
  - id_user (string) --> pembuat grup
  - email_user (string) --> email pembuat grup
  - name (string) --> nama grup baru, gk boleh ada symbol
  - group_pict (image)
- Response

```
{
    "message": "Add new group success",
    "id_group": "-N3F9Rr3nZoH1iR2ohqARedTeamGroup"
}
```

## Get Group Specs

- URL
  - /user/:user_id/group/:group_id
- Method
  - GET
- Request header
  - token
  - id
- Request body
  - none
- Response

```
{
    "message": "Success get specific group",
    "snapshot": {
        "chat": {
            "-N3F9Rr3nZoH1iR2ohqB": {
                "message": "Pesan Awal",
                "timestamp": "21-13-3"
            },
            "-N3FD5fVGhKmUi8ZZvPj": {
                "message": "link storage",
                "sender": "richardalvinpratama8@gmail.com",
                "timestamp": "21-29-0"
            }
        },
        "created_at": "05/29/2022",
        "deskripsi": "Available",
        "group_pict": "link storage",
        "name": "Red Team",
        "users": {
            "-N3F5BULD9ZP94-WJPpT": {
                "emailUser": "richardalvinpratama8@gmail.com",
                "group_role": "admin",
                "join_timestamp": "05/29/2022"
            },
            "-N3F7y14enDV3gbUsPex": {
                "emailUser": "galih8.4.2001@gmail.com",
                "group_role": "member",
                "join_timestamp": "05/29/2022"
            }
        }
    }
}
```

## Add friend to Group

- URL
  - /user/:user_id/group/:group_id
- Method
  - POST
- Request header
  - token
  - id
- Request body
  - nameGroup (string)
  - emailFriend (string)
- Response body

```
{
    "message": "Add yusuf@gmail.com to RedTeam group success"
}
```

## Edit Group

- URL
  - /user/:user_id/group/:group_id
- Method
  - PATCH
- Request header
  - token
  - id
- Request body
  - name (string) --> nama groupnya
  - group_pict (image)
  - deskripsi (string)
- Response body

```
{
    "message": "Success Edit Profile Group"
}
```

## Out from group

- URL
  - /user/:user_id/group/:group_id
- Method
  - DELETE
- Request header
  - token
  - id
- Request body
  - user_id (string)
- Response

```
{
    "message": "Success Delete User from Group"
}
```

## Realtime Chat Group

- URL
  - /user/:user_id/group/:group_id/chat
- Method
  - POST
- Request header
  - token
  - id
- Request body
  - file (file)
  - sender (string)
- Response

```
{
    "message": "Success send chat"
}
```

# Feedback API

## Add feedback

- URL
  - feedback/
- Method
  - POST
- Request header
  - token
  - id
- Request body
  - feedback (string)
- Response

```
{
    "message": "Feedback kamu: aplikasi ini lumayan bagus mungkin bisa ditambah performa di realtime chatnya",
    "code": 1
}
```

- Message
  - 0 == Internal Servver Error
  - 1 == Success Send Feedback
  - 2 == Belum ada feedback

# Announcement API

## Get Announcement by specific division
- URL
  - /user/:user_id/announcement
- Method
  - GET
- Request header
  - token
  - id
- Request body
  - divisi (divisi dari usernya apa) biar bisa di filter 
- Response

```
{
    "snapshot": [
        {
            "message": "testing testing",
            "sender": "Digital",
            "timestamp": "06/16/2022",
            "messageTranslate": "Non",
            "message_id": "-N4eGEPtBY8p2Rsviabq"
        }
    ],
    "code": 1
}
```
- Message
  - 0 == Internal Servver Error
  - 1 == Success


# NodeJs ML API Endpoint
## Translate
- URL
  - /translate
- Method
  - POST
- Request header
  - token
  - id
- Request body
  - message (pesan yang ingin di translate),
  - divisi
  - id_message (ada di get announcement) --> taruk di hidden aja
- Response
```
{
    "message": "Success Store Translate",
    "code": 1
}
```

- Message
  - 0 == Internal Servver Error
  - 1 == Success Store Translate

# Admin

## Login Website

- URL
  - /admin
- Method
  - POST
- Request body
  - username (string) --> email
  - password (string)
- Response

```
{
    "message": "Login Berhasil",
    "_id": id_admin,
    "token": token
}
```

## Get All Users

- URL
  - /admin/users
- Method
  - GET
- Request header
  - token
  - \_id
- Response

```
{
    "message": "Success get All Users",
    "snapshot": [
        {
            "name": "Richard Pratama",
            "email": "richardalvinpratama8@gmail.com",
            "posisi": "Admin",
            "divisi_kerja": "Contact Center",
            "profile_pict": "https://storage.googleapis.com/bangkit_chatapp_bucket/UserPict/2022-4-29-1653833890257pngtree-kue-nastar-kartun-png-image_4508325.png"
        },
        {
            "name": "Galih",
            "email": "galih8.4.2001@gmail.com",
            "posisi": "admin",
            "divisi_kerja": "Customer Experience Excellence",
            "profile_pict": "https://storage.googleapis.com/bangkit_chatapp_bucket/UserPict/2022-4-29-1653833194595broom-11530982283e4sv4cfwin.png"
        }
    ]
}
```

## Get All Groups

- URL
  - /admin/groups
- Method
  - GET
- Request header
  - token
  - \_id
- Response

```
{
    "message": "Success get All Groups",
    "snapshot": [
        {
            "name": "Red Team",
            "created_at": "05/29/2022",
            "group_pict": "https://storage.googleapis.com/bangkit_chatapp_bucket/GroupPict/2022-4-29-1653833583174color-house-3-icon@2x.png"
        }
    ]
}
```

## Get Unapprove New User

- URL
  - /admin/user/approve
- Method
  - GET
- Request header
  - token
  - \_id
- Response

```
{
    "message": "Success Get Unapprove Groups",
    "approve": unapproveUser
}
```

## Approve New User

- URL
  - /admin/user/approve
- Method
  - POST
- Request header
  - token
  - \_id
- Request body
  - approve (boolean)
- Response

```
{
    "message": "Success Approve User",
}
```

## Send Chat Announcement

- URL
  - /user/:user_id/announcement/chat
- Method
  - POST
- Request header
  - token
  - id
- Request body
  - message (text/file)
  - nama_divisi (string)
- Response

```
{
    "message": "Pesan berhasil terkirim"
}
```
