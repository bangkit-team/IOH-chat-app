package com.example.ioh.ui.register

import androidx.lifecycle.ViewModel
import com.example.ioh.data.repository.UserRepository

class ViewModelRegister(private val userRepository: UserRepository): ViewModel() {
    fun register(
        divisi_kerja: String,
        email: String,
        fpassword: String,
        name: String,
        password: String,
        phone_number: String,
        posisi: String) =
        userRepository.register(
            divisi_kerja,
            email,
            fpassword,
            name,
            password,
            phone_number,
            posisi)
}