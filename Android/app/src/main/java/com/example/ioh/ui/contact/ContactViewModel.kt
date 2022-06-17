package com.example.ioh.ui.contact

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.ioh.data.repository.UserRepository

class ContactViewModel (private val userRepository: UserRepository) : ViewModel() {

    fun addNewFriend(token:String, id: String, idUser:String, email: String) =
        userRepository.addNewFriend(token, id, idUser, email)
//    private val _text = MutableLiveData<String>().apply {
//        value = "This is home Fragment"
//    }
//    val text: LiveData<String> = _text
}