package com.example.ioh.ui.chat.adapter

import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.ioh.R
import com.example.ioh.data.model.DataItemContact
import com.example.ioh.databinding.ItemListChatBinding
import de.hdodenhof.circleimageview.CircleImageView

class ChatAdapter(
    private val chatList: ArrayList<DataItemContact>,
    private val messageNoReadCount: Int,
    private val idUser: String,
) :
    RecyclerView.Adapter<ChatAdapter.ViewHolder>() {
    private lateinit var onItemClickCallback: OnItemClickCallback

    fun setOnItemClickCallback(onItemClickCallback: OnItemClickCallback) {
        this.onItemClickCallback = onItemClickCallback
    }

    class ViewHolder(var binding: ItemListChatBinding) : RecyclerView.ViewHolder(binding.root)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val binding =
            ItemListChatBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val currentItemChat = chatList[position]
        val isEmpty = currentItemChat.messages?.isEmpty()
//        val isRead: Boolean

//        if(currentItemChat.messages!!["result"]?.senderId != idUser){
//            if (currentItemChat.messages!!.isNotEmpty()){
//                isRead = currentItemChat.messages!!["result"]?.isRead!!
//                holder.binding.messageNoRead.visibility = if (isRead) View.GONE else View.VISIBLE
//            }
//        }

        if (isEmpty!!) {
            holder.itemView.visibility = View.GONE
        } else {
            holder.itemView.visibility = View.VISIBLE
        }
        holder.binding.noReadMsgCount.text = messageNoReadCount.toString()
        holder.binding.tvNameChat.text = currentItemChat.name
        holder.binding.tvMsgChat.text = currentItemChat.lastMsg
        holder.binding.tvTimeChat.text = currentItemChat.lastMsgTime
        Glide.with(holder.itemView.context).load(currentItemChat.pict).into(holder.binding.imgUser)
        holder.itemView.setOnClickListener {
            onItemClickCallback.onItemClicked(
                chatList[holder.adapterPosition],
            )
        }
    }

    override fun getItemCount() = chatList.size

    interface OnItemClickCallback {
        fun onItemClicked(data: DataItemContact)
    }
}

