package com.example.ioh.ui.chat

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.ioh.data.model.DataItemChat
import com.example.ioh.data.model.DataItemContact
import com.example.ioh.data.model.DataItemMessage
import com.example.ioh.data.remote.local.DbHelper
import com.example.ioh.databinding.FragmentChatBinding
import com.example.ioh.ui.chat.adapter.ChatAdapter
import com.example.ioh.utils.Const
import com.google.firebase.database.*

class ChatFragment : Fragment() {

    private var _binding: FragmentChatBinding? = null
    private lateinit var contacts: ArrayList<DataItemContact>
    private lateinit var adapter: ChatAdapter
    private lateinit var reference: DatabaseReference
    private lateinit var prefHelper: DbHelper
    private lateinit var idUser: String
    private var messageNoReadCount: Int = 0
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View {
        _binding = FragmentChatBinding.inflate(inflater, container, false)
        val root: View = binding.root

        prefHelper = DbHelper(requireActivity())
        idUser = prefHelper.getString(Const.PREF_ID).toString()

        contacts = arrayListOf()
        adapter = ChatAdapter(contacts, messageNoReadCount, idUser)
        binding.rvChat.setHasFixedSize(true)
        binding.rvChat.layoutManager = LinearLayoutManager(requireActivity())
        binding.rvChat.adapter = adapter

        getListChat()

        adapter.setOnItemClickCallback(object : ChatAdapter.OnItemClickCallback {
            override fun onItemClicked(data: DataItemContact) {
//                data.messages!!["result"]?.isRead = false
                DetailChatActivity.start(
                    requireActivity(),
                    data.name!!,
                    data.pict!!,
                    data.id_chat!!,
                    data.id_friend!!,
                )
                requireActivity().finish()
            }
        })

        return root
    }

    private fun getListChat() {
        reference = FirebaseDatabase.getInstance().getReference("users")
            .child(idUser).child("contact")
        reference.addValueEventListener(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                if (snapshot.exists()) {
                    contacts.clear()
                    for (contactSnapshot in snapshot.children) {
                        val contact: DataItemContact? =
                            contactSnapshot.getValue(DataItemContact::class.java)
                        Log.d("test", contact.toString())

//                        if(contact?.messages!!.isNotEmpty()){
//                            if (contact.messages!!["result"]?.isRead!!) {
//                                messageNoReadCount++
//                            } else {
//                                if (messageNoReadCount > 0) {
//                                    messageNoReadCount--
//                                }
//                            }
//                        }

                        contacts.add(contact!!)
                    }
                }
                adapter.notifyDataSetChanged()
            }

            override fun onCancelled(error: DatabaseError) {}
        })
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }


}