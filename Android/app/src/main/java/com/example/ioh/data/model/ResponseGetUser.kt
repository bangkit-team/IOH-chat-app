package com.example.ioh.data.model

import com.google.gson.annotations.SerializedName

data class ResponseGetUser(
    @field:SerializedName("snapshot")
    val snapshot: DataItemUser,

    @field:SerializedName("code")
    val code: Int,
)
