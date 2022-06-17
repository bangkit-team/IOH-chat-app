package com.example.ioh.ui.settings

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.ioh.data.repository.FeedbackRepository

class FeedbackViewModel(private val feedbackRepository: FeedbackRepository) : ViewModel() {

    fun addNewFeedback(token: String, id: String, feedback: String) =
        feedbackRepository.addNewFeedback(token, id, feedback)
}