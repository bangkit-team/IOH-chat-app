package com.example.ioh.ui.login

import androidx.lifecycle.ViewModel
import com.example.ioh.data.remote.local.User
import com.example.ioh.data.repository.UserRepository

class LoginViewModel (private val userRepository: UserRepository): ViewModel() {
    fun login (email: String, password: String) = userRepository.login(email,password)
    fun insert(user: User) {
        userRepository.insertUser(user)
    }
}