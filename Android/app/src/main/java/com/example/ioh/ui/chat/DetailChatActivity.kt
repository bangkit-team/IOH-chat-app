package com.example.ioh.ui.chat

import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.util.Log
import android.view.View
import androidx.recyclerview.widget.LinearLayoutManager
import com.bumptech.glide.Glide
import com.example.ioh.R
import com.example.ioh.data.model.DataItemMessage
import com.example.ioh.data.model.DataItemUser
import com.example.ioh.data.remote.local.DbHelper
import com.example.ioh.databinding.ActivityDetailChatBinding
import com.example.ioh.ui.MainActivity
import com.example.ioh.ui.chat.adapter.MessageAdapter
import com.example.ioh.utils.Const
import com.google.firebase.Timestamp
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.ValueEventListener
import com.google.gson.Gson
import okhttp3.internal.assertThreadHoldsLock
import java.text.SimpleDateFormat
import java.util.*
import kotlin.collections.ArrayList
import kotlin.collections.HashMap

class DetailChatActivity : AppCompatActivity(), View.OnClickListener {
    private lateinit var binding: ActivityDetailChatBinding
    private lateinit var prefHelper: DbHelper
    private lateinit var adapter: MessageAdapter
    private lateinit var messages: ArrayList<DataItemMessage>
    private lateinit var database: FirebaseDatabase
    private lateinit var idChat: String
    private lateinit var senderUid: String
    private lateinit var senderName: String
    private lateinit var receiverUid: String
    private lateinit var receiverName: String

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityDetailChatBinding.inflate(layoutInflater)
        setContentView(binding.root)
        supportActionBar?.hide()

        prefHelper = DbHelper(this)
        database = FirebaseDatabase.getInstance()
        messages = ArrayList()

        val gson = Gson()

        val jsonData = prefHelper.getString(Const.PREF_USER)
        val friendName = intent.getStringExtra(EXTRA_NAME).toString()
        val userImg = intent.getStringExtra(EXTRA_IMG).toString()
        val userData = gson.fromJson(jsonData, DataItemUser::class.java)

        senderName = userData.name
        idChat = intent.getStringExtra(EXTRA_ID_CHAT).toString()

        binding.tvUser.text = friendName
        Glide.with(this).load(userImg).into(binding.imgUser)

        senderUid = prefHelper.getString(Const.PREF_ID).toString()
        receiverUid = intent.getStringExtra(EXTRA_ID_FRIEND).toString()
        receiverName = intent.getStringExtra(EXTRA_NAME).toString()

        adapter = MessageAdapter(this, messages)
        binding.rvMessage.setHasFixedSize(true)
        binding.rvMessage.layoutManager = LinearLayoutManager(this)
        binding.rvMessage.adapter = adapter

        getMessageList(idChat)

        binding.sendBtn.setOnClickListener(this)
        binding.backIcon.setOnClickListener(this)

        binding.etMessage.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {}

            override fun onTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {
                binding.sendBtn.visibility = View.VISIBLE
                binding.cameraBtn.visibility = View.GONE
                binding.micBtn.visibility = View.GONE
            }

            override fun afterTextChanged(p0: Editable?) {
                if (p0!!.isBlank()) {
                    binding.sendBtn.visibility = View.GONE
                    binding.cameraBtn.visibility = View.VISIBLE
                    binding.micBtn.visibility = View.VISIBLE
                }
            }
        })
    }

    private fun getTime(timestamp: Long): String {
        try {
            val date = Date(timestamp)
            val sdf = SimpleDateFormat("h:mm", Locale.getDefault())
            return sdf.format(date)
        } catch (e: Exception) {
            return "date"
        }
    }

    private fun inputMessage(idChat: String, name: String) {
        val messageText = binding.etMessage.text.toString()
        val date = System.currentTimeMillis()
        Log.d("date", date.toString())
        val time = getTime(date)
        val randomKey = database.reference.push().key
        val messages = DataItemMessage(
            randomKey, messageText, senderUid, name, time
        )

        binding.etMessage.setText("")
        val lastMsgObj = HashMap<String, Any>()
        lastMsgObj["lastMsg"] = messages.message.toString()
        lastMsgObj["lastMsgTime"] = messages.time.toString()


        database.reference.child("users").child(senderUid).child("contact").child(idChat)
            .updateChildren(lastMsgObj)
        database.reference.child("users").child(receiverUid).child("contact").child(idChat)
            .updateChildren(lastMsgObj)
        database.reference.child("chats").child(idChat).child("id_friend").setValue(receiverUid)
        database.reference.child("chats").child(idChat).child("friend_name").setValue(receiverUid)
        database.reference.child("chats").child(idChat).child("messages").child(randomKey!!)
            .setValue(messages)
        database.reference.child("users").child(senderUid).child("contact").child(idChat)
            .child("messages").child(randomKey).setValue(messages).addOnSuccessListener {
                database.reference.child("users").child(receiverUid).child("contact").child(idChat)
                    .child("messages").child(randomKey).setValue(messages)
            }

    }

    private fun getMessageList(idChat: String) {
        database.reference.child("chats").child(idChat).child("messages")
            .addValueEventListener(object : ValueEventListener {
                override fun onDataChange(snapshot: DataSnapshot) {
                    messages.clear()
                    for (messageData in snapshot.children) {
                        val message: DataItemMessage? =
                            messageData.getValue(DataItemMessage::class.java)
                        messages.add(message!!)
                    }
                    adapter.notifyDataSetChanged()
                    binding.rvMessage.smoothScrollToPosition(adapter.getItemCount());
                }

                override fun onCancelled(error: DatabaseError) {}
            })
    }

//    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
//        super.onActivityResult(requestCode, resultCode, data)
//        if(requestCode == 25){
//            if(data != null){
//                if(data.data != null){
//                    val selectedImage = data.data
//                    val calendar = Calendar.getInstance()
//                    val reference
//                }
//            }
//        }
//    }

    override fun onClick(view: View?) {
        when (view?.id) {
            R.id.backIcon -> {
                val intent = Intent(view.context, MainActivity::class.java)
                intent.apply {
                    view.context.startActivity(this)
                }
            }
            R.id.send_btn -> {
                inputMessage(idChat, senderName)
            }
        }
    }

    companion object {
        fun start(
            context: Context,
            nameUser: String,
            imgUser: String,
            idChat: String,
            idFriend: String
        ) {
            val intent = Intent(context, DetailChatActivity::class.java)
            intent.putExtra(EXTRA_NAME, nameUser)
            intent.putExtra(EXTRA_IMG, imgUser)
            intent.putExtra(EXTRA_ID_CHAT, idChat)
            intent.putExtra(EXTRA_ID_FRIEND, idFriend)
            intent.apply {
                context.startActivity(this)
            }
        }

        const val EXTRA_NAME = "EXTRA_NAME"
        const val EXTRA_IMG = "EXTRA_ID_IMG"
        const val EXTRA_ID_CHAT = "EXTRA_ID_CHAT"
        const val EXTRA_ID_FRIEND = "EXTRA_ID_FRIEND"
    }
}