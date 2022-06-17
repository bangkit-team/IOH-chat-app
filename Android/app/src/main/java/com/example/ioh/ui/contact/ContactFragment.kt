package com.example.ioh.ui.contact

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.ioh.R
import com.example.ioh.data.model.DataItemContact
import com.example.ioh.data.remote.local.DbHelper
import com.example.ioh.databinding.FragmentAnnouncementBinding
import com.example.ioh.databinding.FragmentContactBinding
import com.example.ioh.ui.ViewModelFactory
import com.example.ioh.ui.chat.DetailChatActivity
import com.example.ioh.ui.chat.adapter.MessageAdapter
import com.example.ioh.ui.contact.adapter.ContactAdapter
import com.example.ioh.utils.Const
import com.google.firebase.database.*
import kotlin.properties.Delegates

class ContactFragment : Fragment(), View.OnClickListener {
    private var _binding: FragmentContactBinding? = null
    private lateinit var contactArray: ArrayList<DataItemContact>
    private lateinit var reference: DatabaseReference
    private lateinit var adapter: ContactAdapter
    private lateinit var idUser: String
    private lateinit var prefHelper: DbHelper
    private var isEmpty = false

    private val binding get() = _binding!!

    init {

    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentContactBinding.inflate(inflater, container, false)
        val root: View = binding.root

        prefHelper = DbHelper(requireActivity())
        idUser = prefHelper.getString(Const.PREF_ID).toString()

        contactArray = arrayListOf()

        adapter = ContactAdapter(contactArray)
        binding.rvUser.layoutManager = LinearLayoutManager(requireActivity())
        binding.rvUser.adapter = adapter
        binding.rvUser.setHasFixedSize(true)
        binding.containerAddFriend.setOnClickListener(this)

        getListContact(idUser)


        adapter.setOnItemClickCallback(object : ContactAdapter.OnItemClickCallback {
            override fun onItemClicked(data: DataItemContact) {
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

    private fun getListContact(idUser: String) {
        reference = FirebaseDatabase.getInstance().getReference("users")
            .child(idUser).child("contact")
        reference.addValueEventListener(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                if (snapshot.exists()) {
                    contactArray.clear()
                    for (contactSnapshot in snapshot.children) {
                        Log.d("test", contactSnapshot.toString())
                        val contact = contactSnapshot.getValue(DataItemContact::class.java)
                        contactArray.add(contact!!)
                    }
                }else{
                    binding.contactEmptyState.visibility = View.VISIBLE
                }
                adapter.notifyDataSetChanged()
                isEmpty = adapter.itemCount == 0
            }

            override fun onCancelled(error: DatabaseError) {}
        })
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    private fun addFriendActivity() {
        AddFriendActivity.start(requireActivity())
        requireActivity().finish()
    }

    override fun onClick(view: View) {
        when (view.id) {
            R.id.container_add_friend -> {
                addFriendActivity()
            }
        }
    }
}