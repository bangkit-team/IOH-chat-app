package com.example.ioh.data.repository

import android.content.ContentValues
import android.net.Uri
import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.example.ioh.data.model.*
import com.example.ioh.data.remote.api.ApiConfig
import com.example.ioh.data.remote.local.User
import com.example.ioh.data.remote.local.UserDao
import com.squareup.okhttp.RequestBody
import okhttp3.MultipartBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors

class UserRepository(
    private val userDao: UserDao
) {
    private val executorService: ExecutorService = Executors.newSingleThreadExecutor()
    private val _isLoading = MutableLiveData<Boolean>()

    fun insertUser(user: User) {
        executorService.execute { userDao.insert(user) }
    }

    fun editUser(
        token: String,
        id: String,
        phone: String,
        about: String,
        profilePict: MultipartBody.Part
    ): LiveData<ResponseEditProfile> {
        val _getEditUsers = MutableLiveData<ResponseEditProfile>()
        val getEditUsers: LiveData<ResponseEditProfile> = _getEditUsers
        _isLoading.value = true

        val call = ApiConfig.getApiService().editUser(token, id, id, phone, about, profilePict)
        call.enqueue(object : Callback<ResponseEditProfile>{
            override fun onResponse(
                call: Call<ResponseEditProfile>,
                response: Response<ResponseEditProfile>
            ) {
                if (response.isSuccessful) {
                    try {
                        response.body()?.let {
                            _getEditUsers.value = response.body()
                        }
                    } catch (e: Exception) {
                        Log.d("UserRepo", "editUser: ${e.message.toString()} ")
                        e.printStackTrace()
                    }
                }
            }

            override fun onFailure(call: Call<ResponseEditProfile>, t: Throwable) {
                Log.d("UserRepo", "editUser: ${t.message.toString()} ")
                t.printStackTrace()
            }
        })

        return getEditUsers
    }

    fun getActiveUser(token: String, id: String): LiveData<ResponseGetUser> {
        val _getUserResult = MutableLiveData<ResponseGetUser>()
        val getUserResult: LiveData<ResponseGetUser> = _getUserResult
        _isLoading.value = true

        val call = ApiConfig.getApiService().getActiveUser(token, id, id)
        call.enqueue(object : Callback<ResponseGetUser> {
            override fun onResponse(
                call: Call<ResponseGetUser>,
                response: Response<ResponseGetUser>
            ) {
                if (response.isSuccessful) {
                    try {
                        response.body()?.let {
                            _getUserResult.value = response.body()
                        }
                    } catch (e: Exception) {
                        Log.d("UserRepo", "getUser: ${e.message.toString()} ")
                        e.printStackTrace()
                    }
                }
            }

            override fun onFailure(call: Call<ResponseGetUser>, t: Throwable) {
                Log.d("UserRepo", "getUser: ${t.message.toString()} ")
                t.printStackTrace()
            }
        })

        return getUserResult
    }

    fun addNewFriend(
        token: String,
        id: String,
        idUser: String,
        email: String
    ): LiveData<ResponseNewFriend> {
        val _newFriendResult = MutableLiveData<ResponseNewFriend>()
        val newFriendResult: LiveData<ResponseNewFriend> = _newFriendResult
        _isLoading.value = true
        val call = ApiConfig.getApiService().addFriend(token, id, idUser, email)
        call.enqueue(object : Callback<ResponseNewFriend> {
            override fun onResponse(
                call: Call<ResponseNewFriend>,
                response: Response<ResponseNewFriend>
            ) {
                if (response.isSuccessful) {
                    try {
                        response.body()?.let {
                            _newFriendResult.value = response.body()
                        }
                    } catch (e: Exception) {
                        Log.d("UserRepo", "getUser: ${e.message.toString()} ")
                        e.printStackTrace()
                    }
                }
            }

            override fun onFailure(call: Call<ResponseNewFriend>, t: Throwable) {
                Log.d("UserRepo", "getUser: ${t.message.toString()} ")
                t.printStackTrace()
            }

        })
        return newFriendResult
    }

    fun login(email: String, password: String): LiveData<ResponseLogin> {
        val _loginResult = MutableLiveData<ResponseLogin>()
        val loginResult: LiveData<ResponseLogin> = _loginResult
        _isLoading.value = true
        val call = ApiConfig.getApiService().login(email, password)
        call.enqueue(object : Callback<ResponseLogin> {
            override fun onResponse(call: Call<ResponseLogin>, response: Response<ResponseLogin>) {
                _isLoading.value = false
                if (response.isSuccessful) {
                    try {
                        response.body()?.let {
                            _loginResult.value = response.body()
                        }
                    } catch (e: Exception) {
                        Log.d("UserRepo", "getUser: ${e.message.toString()} ")
                        e.printStackTrace()
                    }
                } else {
                    Log.e(ContentValues.TAG, "onFailure: ${response.message()}")
                }
            }

            override fun onFailure(call: Call<ResponseLogin>, t: Throwable) {
                Log.d("Error", t.message.toString())
            }
        })
        return loginResult
    }

    fun register(
        name: String,
        posisi: String,
        divisi_kerja: String,
        email: String,
        password: String,
        fpassword: String,
        phone_number: String
    )
            : LiveData<ResponseRegister> {
        val _registerResult = MutableLiveData<ResponseRegister>()
        val registerResult: LiveData<ResponseRegister> = _registerResult
        _isLoading.value = true
        val call = ApiConfig.getApiService().apiRegister(
            divisi_kerja,
            email,
            fpassword,
            name,
            password,
            phone_number,
            posisi
        )

        call.enqueue(object : Callback<ResponseRegister> {
            override fun onResponse(
                call: Call<ResponseRegister>,
                response: Response<ResponseRegister>
            ) {
                if (response.isSuccessful) {
                    Log.i("cekRegister", "onResponse: " + response.message())
                    response.body()?.let {
                        Log.i("cekRegister", "berhasil daftar")
                    }
                } else {
                    Log.i("cekRegister", "onResponse: " + response.message())
                }
            }

            override fun onFailure(call: Call<ResponseRegister>, t: Throwable) {
                Log.d("Error", t.message.toString())
            }
        })
        return registerResult
    }

    companion object {
        @Volatile
        private var instance: UserRepository? = null
        fun getInstance(
            userDao: UserDao
        ): UserRepository =
            instance ?: synchronized(this) {
                instance ?: UserRepository(userDao)
            }.also { instance = it }
    }
}
