package com.example.ioh.data.model

import com.google.gson.annotations.SerializedName

data class ResponseLogin(

	@field:SerializedName("dataUser")
	val dataUser: DataUser,

	@field:SerializedName("message")
	val message: String,

	@field:SerializedName("token")
	val token: String,

	@field:SerializedName("code")
	val code: Int
)

data class DataUser(

	@field:SerializedName("id_user")
	val idUser: String
)
