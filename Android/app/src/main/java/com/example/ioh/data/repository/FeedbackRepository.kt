package com.example.ioh.data.repository

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.example.ioh.data.model.ResponseFeedback
import com.example.ioh.data.remote.api.ApiConfig
import com.example.ioh.data.remote.api.ApiInterface
import com.example.ioh.data.remote.local.UserDao
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class FeedbackRepository {
    private val _isLoading = MutableLiveData<Boolean>()

    fun addNewFeedback(token: String, id: String, feedback: String): LiveData<ResponseFeedback> {
        val _feedbackResult = MutableLiveData<ResponseFeedback>()
        val feedbackResult: LiveData<ResponseFeedback> = _feedbackResult

        _isLoading.value = true
        val call = ApiConfig.getApiService().addNewFeedback(token, id, feedback)
        call.enqueue(object : Callback<ResponseFeedback> {
            override fun onResponse(
                call: Call<ResponseFeedback>,
                response: Response<ResponseFeedback>
            ) {
                if (response.isSuccessful) {
                    try {
                        response.body()?.let {
                            _feedbackResult.value = it
                        }
                    } catch (e: Exception) {
                        Log.d("FeedbackRepo", "sentFeedback: ${e.message.toString()} ")
                        e.printStackTrace()
                    }
                }
            }

            override fun onFailure(call: Call<ResponseFeedback>, t: Throwable) {
                Log.d("FeedbackRepo", "sendFeedback: ${t.message.toString()} ")
                t.printStackTrace()
            }
        })
        return feedbackResult
    }

    companion object {
        @Volatile
        private var instance: FeedbackRepository? = null
        fun getInstance(
        ): FeedbackRepository =
            instance ?: synchronized(this) {
                instance ?: FeedbackRepository()
            }.also { instance = it }
    }
}