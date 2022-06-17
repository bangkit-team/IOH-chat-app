package com.example.ioh.data.model

data class DataItemContact (
    val id_chat : String? = "",
    val id_friend : String? = "",
    val name : String? = "",
    val pict : String? = "",
    var messages: HashMap<String, DataItemMessage>? = hashMapOf(),
    val lastMsg: String? = "",
    val lastMsgTime: String? = "",
)