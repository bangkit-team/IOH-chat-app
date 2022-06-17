package com.example.ioh.data.repository

import android.util.Log
import android.view.View
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.example.ioh.data.model.ResponseAnnouncement
import com.example.ioh.data.model.ResponseFeedback
import com.example.ioh.data.remote.api.ApiConfig
import com.example.ioh.data.remote.api.ApiInterface
import com.example.ioh.data.remote.local.UserDao
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class AnnouncementRepository {
    private val _isLoading = MutableLiveData<Boolean>()

    fun getAnnouncement(token: String, id: String, divisi: String): LiveData<ResponseAnnouncement> {
        val _announcementResult = MutableLiveData<ResponseAnnouncement>()
        val announcementResult: LiveData<ResponseAnnouncement> = _announcementResult

        _isLoading.value = true
        val call = ApiConfig.getApiService().getAnnouncement(token, id, id, divisi)
        call.enqueue(object : Callback<ResponseAnnouncement> {
            override fun onResponse(
                call: Call<ResponseAnnouncement>,
                response: Response<ResponseAnnouncement>
            ) {
                if (response.isSuccessful) {
                    try {
                        response.body()?.let {
                            _announcementResult.value = it
                        }
                    } catch (e: Exception) {
                        Log.d("AnnouncementRepo", "getAnnouncement: ${e.message.toString()} ")
                        e.printStackTrace()
                    }
                }
            }

            override fun onFailure(call: Call<ResponseAnnouncement>, t: Throwable) {
                Log.d("AnnouncementRepo", "getAnnouncement: ${t.message.toString()} ")
                t.printStackTrace()
            }
        })

        return announcementResult
    }

    companion object {
        @Volatile
        private var instance: AnnouncementRepository? = null
        fun getInstance(
        ): AnnouncementRepository =
            instance ?: synchronized(this) {
                instance ?: AnnouncementRepository()
            }.also { instance = it }
    }
}