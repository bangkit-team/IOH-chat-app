package com.example.ioh.ui.announcement

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.ioh.data.model.DataItemAnnouncement
import com.example.ioh.data.model.DataItemTranslate
import com.example.ioh.data.model.DataItemUser
import com.example.ioh.data.remote.local.DbHelper
import com.example.ioh.databinding.FragmentAnnouncementBinding
import com.example.ioh.ui.ViewModelFactory
import com.example.ioh.ui.announcement.adapter.AnnouncementAdapter
import com.example.ioh.utils.Const
import com.google.gson.Gson

class AnnouncementFragment : Fragment() {

    private lateinit var viewModel: AnnouncementViewModel
    private lateinit var prefHelper: DbHelper
    private var _binding: FragmentAnnouncementBinding? = null
    private lateinit var announceArray: ArrayList<DataItemAnnouncement>

    private lateinit var adapter: AnnouncementAdapter

    private lateinit var gson: Gson

    private lateinit var token: String
    private lateinit var idUser: String
    private lateinit var userJson: String

    private lateinit var dataUser: DataItemUser

    private var isTranslated: Boolean = false

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentAnnouncementBinding.inflate(inflater, container, false)
        val root: View = binding.root

        prefHelper = DbHelper(requireActivity())
        val factory: ViewModelFactory = ViewModelFactory.getInstance(this.context!!)
        viewModel = ViewModelProvider(this, factory)[AnnouncementViewModel::class.java]

        announceArray = arrayListOf()

        gson = Gson()

        token = prefHelper.getString(Const.PREF_TOKEN)!!
        idUser = prefHelper.getString(Const.PREF_ID)!!
        userJson = prefHelper.getString(Const.PREF_USER)!!

        dataUser = gson.fromJson(userJson, DataItemUser::class.java)

        adapter = AnnouncementAdapter(announceArray)
        binding.rvAnouncement.layoutManager = LinearLayoutManager(requireActivity())
        binding.rvAnouncement.adapter = adapter
        binding.rvAnouncement.setHasFixedSize(true)

        getAnnouncementList(this, token, idUser, dataUser.divisi_kerja!!)

        return root
    }

    private fun translateText(token: String, id: String, dataTranslate: DataItemTranslate) {
        isTranslated = !isTranslated

        viewModel.translateText(token, id, dataTranslate).observe(this) {
            if (it.code == 0) {
                Toast.makeText(this.context, "Translate error", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun getAnnouncementList(
        owner: LifecycleOwner,
        token: String,
        id: String,
        divisi: String
    ) {
        viewModel.getAnnouncement(token, id, divisi).observe(owner) {
            if (it.code == 0) {
                Toast.makeText(this.context, "Announcement error", Toast.LENGTH_SHORT).show()
            } else if (it.code == 1) {
                if (it.snapshot.isNotEmpty()) {
                    for (data in it.snapshot) {
                        val announceObject = data
                        announceArray.add(announceObject)
                    }
                }else{
                    binding.announceEmptyState.visibility = View.VISIBLE
                }
            }
            adapter.notifyDataSetChanged()
            adapter.setOnItemClickCallback(object :
                AnnouncementAdapter.OnItemClickCallback {
                override fun onItemClicked(data: DataItemAnnouncement) {
                    val translateData =
                        DataItemTranslate(data.message, dataUser.divisi_kerja!!, data.message_id)
//                    val originalText = data.message

                    translateText(token, idUser, translateData)

                    data.message = data.messageTranslate
                    adapter.notifyDataSetChanged()
                }
            })
            adapter.notifyDataSetChanged()
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}