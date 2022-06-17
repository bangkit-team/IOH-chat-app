package com.example.ioh.data.model

import com.google.gson.annotations.SerializedName

data class ResponseTranslateML(
    @field:SerializedName("message")
    val message: String,

    @field:SerializedName("code")
    val code: Int,
)