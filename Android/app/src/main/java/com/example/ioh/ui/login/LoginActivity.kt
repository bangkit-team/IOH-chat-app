package com.example.ioh.ui.login

import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.text.method.HideReturnsTransformationMethod
import android.text.method.PasswordTransformationMethod
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.core.content.ContextCompat
import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.ViewModelProvider
import com.bumptech.glide.Glide
import com.bumptech.glide.request.RequestOptions
import com.example.ioh.R
import com.example.ioh.data.model.DataItemUser
import com.example.ioh.data.remote.local.DbHelper
import com.example.ioh.data.remote.local.User
import com.example.ioh.databinding.ActivityLoginBinding
import com.example.ioh.ui.MainActivity
import com.example.ioh.ui.ViewModelFactory
import com.example.ioh.ui.register.RegisterActivity
import com.example.ioh.utils.Const
import com.google.gson.Gson

class LoginActivity : AppCompatActivity(), View.OnClickListener {

    private lateinit var binding: ActivityLoginBinding
    private lateinit var loginViewModel: LoginViewModel
    private lateinit var getUserViewModel: GetUserViewModel
    private lateinit var dataUser: DataItemUser
    private var user: User? = null
    private lateinit var prefHelper: DbHelper

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)
        supportActionBar?.hide()

        prefHelper = DbHelper(this)
        val factory: ViewModelFactory = ViewModelFactory.getInstance(applicationContext)
        loginViewModel = ViewModelProvider(this, factory)[LoginViewModel::class.java]
        getUserViewModel = ViewModelProvider(this, factory)[GetUserViewModel::class.java]

        binding.ivPassword.setOnClickListener(this)
        binding.btnLogin.setOnClickListener(this)
        binding.btnRegister.setOnClickListener(this)
    }

    private fun registerActiviy() {
        RegisterActivity.start(this)
        finish()
    }

    private fun login(email: String, password: String) {
        loginViewModel.login(email, password).observe(this) {
            when (it.message) {
                "Login Berhasil" -> {
                    getActiveUser(it.token, it.dataUser.idUser)

                    val gson = Gson()
                    val userJson = gson.toJson(dataUser)

                    user = User(
                        it.token,
                        it.dataUser.idUser,
                        true,
                        userJson,
                    )
                    loginViewModel.insert(user!!)

                    saveUserData(
                        it.token,
                        it.dataUser.idUser,
                        userJson,
                    )
                    saveSession()
                    Toast.makeText(this, "Login Berhasil", Toast.LENGTH_SHORT).show()
                    val mIntent = Intent(this, MainActivity::class.java)
                    startActivity(mIntent)
                }
                "Akun belum diapprove oleh Admin" -> {
                    Toast.makeText(this, "Akun belum diapprove oleh Admin", Toast.LENGTH_SHORT)
                        .show()
                }
                else -> {
                    Toast.makeText(this, "Login gagal", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    private fun getActiveUser(token: String, id: String) {
        getUserViewModel.getActiveUser(token, id).observe(this) {
            if (it.code == 0) {
                Toast.makeText(this, "Internal server error", Toast.LENGTH_SHORT).show()
            } else if (it.code == 1) {
                dataUser = it.snapshot
            }
        }
    }

    private fun switchPassword() {
        if (binding.ivPassword.tag.toString() == "hidden") {
            binding.ivPassword.tag = "show"
            binding.ivPassword.setImageDrawable(
                ContextCompat.getDrawable(
                    this, R.drawable
                        .ic_show_password
                )
            )
            binding.etPassword.transformationMethod = HideReturnsTransformationMethod.getInstance()
        } else {
            binding.ivPassword.tag = "hidden"
            binding.ivPassword.setImageDrawable(
                ContextCompat.getDrawable(
                    this, R.drawable
                        .ic_hide_password
                )
            )
            binding.etPassword.transformationMethod = PasswordTransformationMethod.getInstance()
        }
    }

    private fun isValidEmail(email: CharSequence): Boolean {
        return android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()
    }

    override fun onClick(view: View) {
        when (view.id) {
            R.id.iv_password -> {
                switchPassword()
            }
            R.id.btnLogin -> {
                val email = binding.edtEmail.text.toString().trim()
                val password = binding.etPassword.text.toString().trim()

                if (email.isEmpty()) {
                    binding.edtEmail.error = FIELD_REQUIRED
                    return
                }
                if (password.isEmpty()) {
                    binding.etPassword.error = FIELD_REQUIRED
                    return
                }
                if (!isValidEmail(email)) {
                    binding.edtEmail.error = FIELD_IS_NOT_VALID
                    return
                }
                login(email, password)
            }
            R.id.btnRegister -> {
                registerActiviy()
            }
        }
    }

    private fun saveUserData(
        token: String,
        id: String,
        userData: String
    ) {
        prefHelper.put(Const.PREF_TOKEN, token)
        prefHelper.put(Const.PREF_ID, id)
        prefHelper.put(Const.PREF_USER, userData)
    }

    private fun saveSession() {
        prefHelper.put(Const.PREF_IS_FIRST, true)
    }

    companion object {
        fun start(context: Context) {
            val intent = Intent(context, LoginActivity::class.java)
            intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)
            intent.apply {
                context.startActivity(this)
            }
        }

        const val FIELD_REQUIRED = "Field tidak boleh kosong"
        const val FIELD_IS_NOT_VALID = "Email tidak valid"
    }
}