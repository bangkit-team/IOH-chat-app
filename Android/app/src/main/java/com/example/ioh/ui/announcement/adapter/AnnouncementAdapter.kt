package com.example.ioh.ui.announcement.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.ioh.R
import com.example.ioh.data.model.DataItemAnnouncement


class AnnouncementAdapter(
    private val announceList: ArrayList<DataItemAnnouncement>
) :
    RecyclerView.Adapter<AnnouncementAdapter.ViewHolder>() {

    private lateinit var onItemClickCallback: OnItemClickCallback

    fun setOnItemClickCallback(onItemClickCallback: OnItemClickCallback) {
        this.onItemClickCallback = onItemClickCallback
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val itemView =
            LayoutInflater.from(parent.context)
                .inflate(R.layout.item_list_announcement, parent, false)
        return ViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val currentAnnounceItem = announceList[position]

        holder.tvSender.text = currentAnnounceItem.sender
        holder.tvMessage.text = currentAnnounceItem.message
        holder.tvTime.text = currentAnnounceItem.timestamp
        holder.translatorBtn.setOnClickListener {
            onItemClickCallback.onItemClicked(
                announceList[holder.adapterPosition])
        }
    }

    override fun getItemCount(): Int {
        return announceList.size
    }

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val tvSender = itemView.findViewById<TextView>(R.id.tv_sender)
        val tvMessage = itemView.findViewById<TextView>(R.id.tv_announce_message)
        val tvTime = itemView.findViewById<TextView>(R.id.tv_announce_time)
        val translatorBtn = itemView.findViewById<TextView>(R.id.see_translation_btn)
    }

    interface OnItemClickCallback {
        fun onItemClicked(data: DataItemAnnouncement)
    }
}