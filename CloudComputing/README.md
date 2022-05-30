# API Endpoint
- heroku:
  - http://redteam-chatapp.herokuapp.com/  

# API List
yg blm kurang GET utk PC, Group, Announcement

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

## SignUp User
- URL
  - /user
- Method
  - POST
- Request body
  - name (string)
  - tanggal_lahir (string)
  - posisi (string)
  - divisi_kerja (string)
  - email (string)
  - password (string)
  - fpassword (string)
  - phone_number (string)
  - profile_pict (image)
- Response 
```
{
  "message": "Register Berhasil"
}
```

## Get User Information
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
        "about": "Available",
        "approve": true,
        "contact": {
            "-N3F8Cly2dNVPB15qaXvRichard Alvin-GalihPC": {
                "emailFriend": "richardalvinpratama8@gmail.com",
                "id_chat": "-N3F8Cly2dNVPB15qaXvRichard-GalihPC",
                "namaFriend": "Richard Alvin"
            },
            "-N3F9Rr3nZoH1iR2ohqARed TeamGroup": {
                "id_group": "-N3F9Rr3nZoH1iR2ohqARed TeamGroup",
                "nameGroup": "Red Team"
            }
        },
        "divisi_kerja": "Customer Experience Excellence",
        "email": "galih8.4.2001@gmail.com",
        "name": "Galih",
        "password": "$2b$10$UmOkmyo5V4XQ8I2EDRYvSuoVJzqQMJJDYw1c6vqQ4VLc7/iy4/L9m",
        "phone_number": "64564436",
        "posisi": "admin",
        "profile_pict": "link storage",
        "tanggal_lahir": "9 november 2004",
        "timestamp": "05/29/2022"
    }
}
```

## Add new friend as PC
- URL
  - /user/:user_id
- Method
  - POST
- Request body
  - email (string) --> email temen yang mau di accept
- Response 
```
{
    "message": "Add Friend Success",
    "id_chat": "-N3F8Cly2dNVPB15qaXvRichard-GalihPC"
}
```

## Edit Profile User
- URL
  - /user/:user_id
- Method
  - PATCH
- Request body
  - name_user (string)
  - phone_number (string)
  - tanggal_lahir (string)
  - posisi (string)
  - divisi_kerja (string)
  - about (string)
  - profile_pict (file)
- Response
```
{
    "message": "Success Edit Profile User"
}
```

## Realtime Chat PC
- URL
  - /user/:user_id/chat/:chat_id
- Method
  - POST
- Request body
  - file (file)
- Response
```
{
    "message": "Success send chat"
}
```

## Add new Group
- URL
  - /user/:user_id/group
- Method
  - POST
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
- Request body
  - file (file)
  - sender (string)
- Response
```
{
    "message": "Success send chat"
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

## Add Announcement
- URL
  - /user/:user_id/announcement
- Method
  - POST
- Request body
  - none --> utk divisinya udah dicek berdasarkan param user_id, dan kalo udah ada gk bakal buat lagi
- Response
```
{
    "message": "Berhasil menambahkan announcement Call Center"
}
```

## Send Chat Announcement
- URL
  - /user/:user_id/announcement/:div_id
- Method
  - POST
- Request body
  - message (text/file)
- Response
```
{
    "message": "Pesan berhasil terkirim"
}
```
