package com.example.ioh.ui.settings

import androidx.lifecycle.ViewModel
import com.example.ioh.data.repository.UserRepository
import okhttp3.MultipartBody

class EditProfileViewModel(private val userRepository: UserRepository) : ViewModel() {
    fun getActiveUser(
        token: String,
        id: String,
        phone: String,
        about: String,
        profilePict: MultipartBody.Part
    ) =
        userRepository.editUser(token, id, phone, about, profilePict)
}