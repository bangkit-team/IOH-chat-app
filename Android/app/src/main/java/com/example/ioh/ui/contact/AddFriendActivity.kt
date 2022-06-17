package com.example.ioh.ui.contact

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import com.example.ioh.R
import com.example.ioh.data.remote.local.DbHelper
import com.example.ioh.databinding.ActivityAddFriendBinding
import com.example.ioh.ui.MainActivity
import com.example.ioh.ui.ViewModelFactory
import com.example.ioh.ui.login.LoginActivity
import com.example.ioh.utils.Const

class AddFriendActivity : AppCompatActivity(), View.OnClickListener {

    private lateinit var binding: ActivityAddFriendBinding
    private lateinit var idUser: String
    private lateinit var token: String
    private lateinit var viewModel: ContactViewModel
    private lateinit var prefHelper: DbHelper

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityAddFriendBinding.inflate(layoutInflater)
        setContentView(binding.root)
        supportActionBar!!.hide()
        binding.backIcon.setOnClickListener(this)

        prefHelper = DbHelper(this)
        idUser = prefHelper.getString(Const.PREF_ID).toString()
        token = prefHelper.getString(Const.PREF_TOKEN).toString()
        val factory: ViewModelFactory = ViewModelFactory.getInstance(this)
        viewModel = ViewModelProvider(this, factory)[ContactViewModel::class.java]

        addContact(token, idUser, idUser, binding.edtEmail.text.toString())

        binding.btnUndang.setOnClickListener(this)
    }

    private fun addContact(token: String, id: String, idUser: String, email: String) {
        viewModel.addNewFriend(token, id, idUser, email).observe(this) {
            Log.d("test",it.code.toString())
            when (it.code) {
                0 -> {
                    Toast.makeText(this, "Internal server error", Toast.LENGTH_SHORT).show()
                }
                1 -> {
                    Toast.makeText(this,"Sukses menambahkan teman", Toast.LENGTH_SHORT).show()
                    val intent = Intent(this, MainActivity::class.java)
                    startActivity(intent);
                }
                2 -> {
                    Toast.makeText(this, "Email tidak terdaftar", Toast.LENGTH_SHORT).show()
                }
                3 -> {
                    Toast.makeText(
                        this, "Contact telah ditambahkan",
                        Toast.LENGTH_SHORT
                    ).show()
                }
                4 -> {
                    Toast.makeText(
                        this, "Error when insert new contact friend",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }
        }
    }

    private fun isValidEmail(email: CharSequence): Boolean {
        return android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()
    }

    override fun onClick(view: View) {
        when (view.id) {
            R.id.btnUndang -> {
                val email = binding.edtEmail.text.toString().trim()

                if (email.isEmpty()) {
                    binding.edtEmail.error = LoginActivity.FIELD_REQUIRED
                    return
                }

                if (!isValidEmail(email)) {
                    binding.edtEmail.error = LoginActivity.FIELD_IS_NOT_VALID
                    return
                }

                addContact(token, idUser, idUser, email)
            }
            R.id.backIcon -> {
                val intent = Intent(view.context, MainActivity::class.java)
                startActivity(intent);
            }
        }
    }

    companion object {
        fun start(context: Context) {
            Intent(context, AddFriendActivity::class.java).apply {
                context.startActivity(this)
            }
        }

        const val FIELD_REQUIRED = "Field tidak boleh kosong"
        const val FIELD_IS_NOT_VALID = "Email tidak valid"
    }
}