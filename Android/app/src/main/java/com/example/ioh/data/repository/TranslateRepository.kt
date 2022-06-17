package com.example.ioh.data.repository

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.example.ioh.data.model.DataItemTranslate
import com.example.ioh.data.model.ResponseTranslateML
import com.example.ioh.data.remote.api.ApiConfig
import com.google.gson.Gson
import com.google.gson.JsonObject
import org.json.JSONObject
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class TranslateRepository {
    private val _isLoading = MutableLiveData<Boolean>()

    fun translateText(
        token: String,
        id: String,
        dataTranslate: DataItemTranslate
    ): LiveData<ResponseTranslateML> {
        val _translateResult = MutableLiveData<ResponseTranslateML>()
        val translateResult: LiveData<ResponseTranslateML> = _translateResult

        _isLoading.value = true

        val call = ApiConfig.getApiService().translateMessage(token, id, dataTranslate)
        call.enqueue(object : Callback<ResponseTranslateML> {
            override fun onResponse(
                call: Call<ResponseTranslateML>,
                response: Response<ResponseTranslateML>
            ) {
                if (response.isSuccessful) {
                    try {
                        response.body()?.let {
                            _translateResult.value = it
                        }
                    } catch (e: Exception) {
                        Log.d("TranslateRepo", "translate: ${e.message.toString()} ")
                        e.printStackTrace()
                    }
                }
            }

            override fun onFailure(call: Call<ResponseTranslateML>, t: Throwable) {
                Log.d("TranslateRepo", "translate: ${t.message.toString()} ")
                t.printStackTrace()
            }

        })
        return translateResult
    }

    companion object {
        @Volatile
        private var instance: TranslateRepository? = null
        fun getInstance(
        ): TranslateRepository =
            instance ?: synchronized(this) {
                instance ?: TranslateRepository()
            }.also { instance = it }
    }
}