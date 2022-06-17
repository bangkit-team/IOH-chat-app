package com.example.ioh.data.model

data class DataItemChat (
    var id_chat: String? = "",
    val id_friend: String? = "",
    val friend_name: String? = "",
    var messages: HashMap<String, DataItemMessage>? = hashMapOf(),
    val lastMsg: String? = "",
    val lastMsgTime: String? = "",
)

