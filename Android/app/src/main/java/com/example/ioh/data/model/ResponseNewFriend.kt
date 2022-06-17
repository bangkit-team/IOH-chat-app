package com.example.ioh.data.model

import com.google.gson.annotations.SerializedName

data class ResponseNewFriend(
	@field:SerializedName("id_chat")
	val idChat: String? = null,

	@field:SerializedName("nameFriend")
	val nameFriend: String? = null,

	@field:SerializedName("message")
	val message: String? = null,

	@field:SerializedName("id_friend")
	val idFriend: String? = null,

	@field:SerializedName("code")
	val code: Int? = null,
)
