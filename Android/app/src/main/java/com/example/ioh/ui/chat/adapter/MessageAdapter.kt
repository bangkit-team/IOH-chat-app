package com.example.ioh.ui.chat.adapter

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.ioh.R
import com.example.ioh.data.model.DataItemMessage
import com.example.ioh.data.remote.local.DbHelper
import com.example.ioh.databinding.ReceiveMsgBinding
import com.example.ioh.databinding.SendMsgBinding
import com.example.ioh.utils.Const
import com.google.firebase.auth.FirebaseAuth

class MessageAdapter(
    val context: Context,
    messages: ArrayList<DataItemMessage>,
) : RecyclerView.Adapter<RecyclerView.ViewHolder>() {

    var messages: ArrayList<DataItemMessage>

    val ITEM_SENDER = 1
    val ITEM_RECEIVE = 2

    init {
        this.messages = messages
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        return if (viewType == ITEM_SENDER) {
            val view: View =
                LayoutInflater.from(parent.context).inflate(R.layout.send_msg, parent, false)
             SendMsgHolder(view)
        } else {
            val view: View =
                LayoutInflater.from(parent.context).inflate(R.layout.receive_msg, parent, false)
             ReceiveMsgHolder(view)
        }
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        val currentMessage = messages[position]
        if (holder.javaClass == SendMsgHolder::class.java) {
            val viewHolder = holder as SendMsgHolder
            viewHolder.binding.sendMsg.text = currentMessage.message
            viewHolder.binding.sendTime.text = currentMessage.time
        } else {
            val viewHolder = holder as ReceiveMsgHolder
            viewHolder.binding.recMsg.text = currentMessage.message
            viewHolder.binding.recTime.text = currentMessage.time
        }
    }

    override fun getItemViewType(position: Int): Int {
        val prefHelper = DbHelper(context)
        val currentUserId = prefHelper.getString(Const.PREF_ID)
        val messages = messages[position]
        return if (currentUserId.equals(messages.senderId)) {
            ITEM_SENDER
        } else {
            ITEM_RECEIVE
        }
    }

    override fun getItemCount() = messages.size

    inner class SendMsgHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        var binding: SendMsgBinding = SendMsgBinding.bind(itemView)
    }

    inner class ReceiveMsgHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        var binding: ReceiveMsgBinding = ReceiveMsgBinding.bind(itemView)
    }
}