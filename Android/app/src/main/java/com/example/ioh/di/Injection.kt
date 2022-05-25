package com.example.ioh.di

import android.content.Context
import com.example.ioh.data.remote.api.ApiConfig
import com.example.ioh.data.repository.UserRepository

object Injection {
    fun provideRepository(context: Context): UserRepository {
        val apiService = ApiConfig.getApiService()
        return UserRepository.getInstance(apiService)
    }
}