package com.example.ioh.di

import android.content.Context
import com.example.ioh.data.remote.api.ApiConfig
import com.example.ioh.data.remote.local.UserRoomDatabase
import com.example.ioh.data.repository.AnnouncementRepository
import com.example.ioh.data.repository.FeedbackRepository
import com.example.ioh.data.repository.TranslateRepository
import com.example.ioh.data.repository.UserRepository

object Injection {
    fun provideUserRepository(context: Context): UserRepository {
        val database = UserRoomDatabase.getInstance(context)
        val dao = database.userDao()
        return UserRepository.getInstance(dao)
    }

    fun provideFeedbackRepository(): FeedbackRepository{
        return FeedbackRepository.getInstance()
    }

    fun provideAnnouncementRepository(): AnnouncementRepository{
        return AnnouncementRepository.getInstance()
    }

    fun provideTranslateRepository(): TranslateRepository {
        return TranslateRepository.getInstance()
    }
}