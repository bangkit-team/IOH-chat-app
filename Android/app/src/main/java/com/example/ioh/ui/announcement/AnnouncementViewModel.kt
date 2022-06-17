package com.example.ioh.ui.announcement

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.ioh.data.model.DataItemTranslate
import com.example.ioh.data.repository.AnnouncementRepository
import com.example.ioh.data.repository.FeedbackRepository
import com.example.ioh.data.repository.TranslateRepository

class AnnouncementViewModel(
    private val announcementRepository: AnnouncementRepository,
    private val translateRepository: TranslateRepository
) :
    ViewModel() {
    fun getAnnouncement(token: String, id: String, divisi: String) =
        announcementRepository.getAnnouncement(token, id, divisi)

    fun translateText(token: String, id: String, dataTranslate: DataItemTranslate) =
        translateRepository.translateText(token, id, dataTranslate)
}