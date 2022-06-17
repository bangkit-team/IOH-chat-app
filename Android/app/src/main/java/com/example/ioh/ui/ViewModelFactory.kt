package com.example.ioh.ui

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.example.ioh.data.repository.AnnouncementRepository
import com.example.ioh.data.repository.FeedbackRepository
import com.example.ioh.data.repository.TranslateRepository
import com.example.ioh.di.Injection
import com.example.ioh.data.repository.UserRepository
import com.example.ioh.ui.announcement.AnnouncementViewModel
import com.example.ioh.ui.contact.ContactViewModel
import com.example.ioh.ui.login.LoginViewModel
import com.example.ioh.ui.register.ViewModelRegister
import com.example.ioh.ui.settings.FeedbackViewModel
import com.example.ioh.ui.login.GetUserViewModel
import com.example.ioh.ui.settings.EditProfileViewModel

class ViewModelFactory private constructor(
    private val userRepository: UserRepository,
    private val feedbackRepository: FeedbackRepository,
    private val announcementRepository: AnnouncementRepository,
    private val translateRepository: TranslateRepository
) :
    ViewModelProvider.NewInstanceFactory() {
    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(LoginViewModel::class.java)) {
            return LoginViewModel(userRepository) as T
        }
        if (modelClass.isAssignableFrom(ViewModelRegister::class.java)) {
            return ViewModelRegister(userRepository) as T
        }
        if (modelClass.isAssignableFrom(ContactViewModel::class.java)) {
            return ContactViewModel(userRepository) as T
        }
        if (modelClass.isAssignableFrom(GetUserViewModel::class.java)) {
            return GetUserViewModel(userRepository) as T
        }
        if (modelClass.isAssignableFrom(FeedbackViewModel::class.java)) {
            return FeedbackViewModel(feedbackRepository) as T
        }
        if (modelClass.isAssignableFrom(EditProfileViewModel::class.java)) {
            return EditProfileViewModel(userRepository) as T
        }
        if (modelClass.isAssignableFrom(AnnouncementViewModel::class.java)) {
            return AnnouncementViewModel(
                announcementRepository,
                translateRepository
            ) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class: " + modelClass.name)
    }

    companion object {
        @Volatile
        private var instance: ViewModelFactory? = null
        fun getInstance(context: Context): ViewModelFactory =
            instance ?: synchronized(this) {
                instance ?: ViewModelFactory(
                    Injection.provideUserRepository(context),
                    Injection.provideFeedbackRepository(),
                    Injection.provideAnnouncementRepository(),
                    Injection.provideTranslateRepository()
                )
            }.also { instance = it }
    }
}