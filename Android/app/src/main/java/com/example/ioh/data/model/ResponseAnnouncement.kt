package com.example.ioh.data.model

import com.google.gson.annotations.SerializedName

data class ResponseAnnouncement(
    @field:SerializedName("snapshot")
    val snapshot: List<DataItemAnnouncement>,

    @field:SerializedName("code")
    val code: Int,
)
