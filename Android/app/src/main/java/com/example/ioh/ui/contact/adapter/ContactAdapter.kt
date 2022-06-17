package com.example.ioh.ui.contact.adapter

import android.content.Context
import android.content.Intent
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bumptech.glide.request.RequestOptions
import com.example.ioh.R
import com.example.ioh.data.model.DataItemContact
import com.example.ioh.ui.chat.DetailChatActivity
import de.hdodenhof.circleimageview.CircleImageView

class ContactAdapter(
    private val userList: ArrayList<DataItemContact>
) :
    RecyclerView.Adapter<ContactAdapter.ViewHolder>() {

    private lateinit var onItemClickCallback: OnItemClickCallback

    fun setOnItemClickCallback(onItemClickCallback: OnItemClickCallback){
        this.onItemClickCallback = onItemClickCallback
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val itemView =
            LayoutInflater.from(parent.context).inflate(R.layout.item_list_contact, parent, false)
        return ViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val currentItemUser = userList[position]
        holder.name.text = currentItemUser.name
        Glide.with(holder.itemView.context)
            .load(currentItemUser.pict)
            .apply(
                RequestOptions()
                    .placeholder(R.drawable.ic_launcher_foreground)
            )
            .into(holder.imageView)
        holder.itemView.setOnClickListener{
            onItemClickCallback.onItemClicked(userList[holder.adapterPosition])
        }
    }

    override fun getItemCount(): Int {
        return userList.size
    }

    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val name: TextView = itemView.findViewById(R.id.tv_name)
        val imageView: CircleImageView = itemView.findViewById(R.id.img_user)
    }

    interface OnItemClickCallback{
        fun onItemClicked(data: DataItemContact)
    }
}