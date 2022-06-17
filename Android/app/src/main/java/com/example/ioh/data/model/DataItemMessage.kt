package com.example.ioh.data.model

data class DataItemMessage(
    var id_message: String? = "",
    val message: String? = "",
    val senderId: String? = "",
    val sender: String? = "",
    val time: String? = "",
    var isRead: Boolean = true,
)