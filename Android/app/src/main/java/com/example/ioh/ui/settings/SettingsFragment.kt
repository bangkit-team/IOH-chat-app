package com.example.ioh.ui.settings

import android.app.Dialog
import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.ViewModelProvider
import com.bumptech.glide.Glide
import com.bumptech.glide.request.RequestOptions
import com.example.ioh.R
import com.example.ioh.data.model.DataItemUser
import com.example.ioh.data.remote.local.DbHelper
import com.example.ioh.databinding.FragmentSettingsBinding
import com.example.ioh.ui.ViewModelFactory
import com.example.ioh.ui.login.LoginActivity
import com.example.ioh.ui.login.GetUserViewModel
import com.example.ioh.utils.Const
import com.google.gson.Gson

class SettingsFragment : Fragment(), View.OnClickListener {

    private var _binding: FragmentSettingsBinding? = null
    private lateinit var viewModel: GetUserViewModel
    private lateinit var prefHelper: DbHelper
    private lateinit var dialog: Dialog
    private lateinit var gson: Gson

    private lateinit var dataUser: DataItemUser
    private lateinit var jsonUser: String

    private lateinit var yesBtn: Button
    private lateinit var noBtn: Button

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View {
        _binding = FragmentSettingsBinding.inflate(inflater, container, false)
        val root: View = binding.root

        prefHelper = DbHelper(requireActivity())
        val factory: ViewModelFactory = ViewModelFactory.getInstance(this.context!!)
        viewModel = ViewModelProvider(this, factory)[GetUserViewModel::class.java]

        gson = Gson()
        jsonUser = prefHelper.getString(Const.PREF_USER).toString()
        dataUser = gson.fromJson(jsonUser, DataItemUser::class.java)

        binding.tvName.text = dataUser.name
        binding.tvHp.text = dataUser.phone_number
        binding.tvDivisi.text = dataUser.divisi_kerja
        Glide.with(this)
            .load(dataUser.profile_pict)
            .apply(
                RequestOptions()
                    .placeholder(R.drawable.ic_launcher_foreground)
            )
            .into(binding.imgUser)

        dialog = Dialog(this.context!!)
        dialog.setContentView(R.layout.logout_dialog)

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            dialog.window?.setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))
        }

        dialog.window?.setLayout(
            ViewGroup.LayoutParams.WRAP_CONTENT,
            ViewGroup.LayoutParams.WRAP_CONTENT
        )
        dialog.setCancelable(false)
        dialog.window!!.attributes.windowAnimations = R.style.animation

        yesBtn = dialog.findViewById(R.id.yes_logout)
        noBtn = dialog.findViewById(R.id.no_logout)

        yesBtn.setOnClickListener(this)
        noBtn.setOnClickListener(this)
        binding.tvFeedbacks.setOnClickListener(this)
        binding.tvLogout.setOnClickListener(this)
        binding.userProfile.setOnClickListener(this)
        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    private fun loginActivity() {
        LoginActivity.start(requireActivity())
        requireActivity().finish()
    }

    private fun clear_session() {
        prefHelper.put(Const.PREF_IS_FIRST, false)
        prefHelper.clear()
    }

    override fun onClick(view: View) {
        when (view.id) {
            R.id.yes_logout -> {
                dialog.dismiss()
                clear_session()
                loginActivity()
            }
            R.id.no_logout -> {
                dialog.dismiss()
            }
            R.id.tv_feedbacks -> {
                FeedbackActivity.start(requireActivity())
                requireActivity().finish()
            }
            R.id.tv_logout -> {
                dialog.show()
            }
            R.id.userProfile -> {
                EditProfileActivity.start(requireActivity())
                requireActivity().finish()
            }
        }
    }

    companion object {
        const val EXTRA_USER = "EXTRA_USER"
    }
}