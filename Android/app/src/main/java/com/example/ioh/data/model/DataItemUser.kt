package com.example.ioh.data.model

data class DataItemUser(
    val about: String? = null,
    val approve: Boolean,
    val contact: DataItemContact,
    val divisi_kerja: String? = null,
    val email: String? = null,
    val name: String,
    val password: String,
    val phone_number: String,
    val posisi: String,
    val profile_pict: String,
    val notReadMessage: Int = 0,
    val timeStamp: String,
)