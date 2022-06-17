package com.example.ioh.data.model

import com.google.gson.annotations.SerializedName

data class ResponseFeedback(
    @field:SerializedName("message")
    val message: String? = null,

    @field:SerializedName("code")
    val code: Int? = null,
)
