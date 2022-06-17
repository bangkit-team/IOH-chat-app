package com.example.ioh.ui.login

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.ioh.data.repository.UserRepository

class GetUserViewModel (private val userRepository: UserRepository) : ViewModel() {
    fun getActiveUser(token: String, id: String) =
        userRepository.getActiveUser(token, id)
}