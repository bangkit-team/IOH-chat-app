package com.example.ioh.data.remote.local

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey
import com.example.ioh.data.model.DataItemUser

@Entity(tableName = "user")
class User(
    @PrimaryKey
    @ColumnInfo(name = "id")
    var id: String,

    @ColumnInfo(name = "token")
    var token: String,

    @ColumnInfo(name = "isLogin")
    var isLogin: Boolean,

    @ColumnInfo(name = "data")
    var userData: String

)