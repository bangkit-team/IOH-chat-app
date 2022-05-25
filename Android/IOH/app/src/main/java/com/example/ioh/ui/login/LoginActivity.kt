package com.example.ioh.ui.login

import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.text.method.HideReturnsTransformationMethod
import android.text.method.PasswordTransformationMethod
import android.view.WindowInsets
import android.view.WindowManager
import androidx.appcompat.app.AppCompatActivity
import com.example.ioh.R
import com.example.ioh.databinding.ActivityLoginBinding
import com.example.ioh.ui.MainActivity
import com.example.ioh.ui.register.RegisterActivity

class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        supportActionBar?.hide()

        @Suppress("DEPRECATION")
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            window.insetsController?.hide(WindowInsets.Type.statusBars())
        } else {
            window.setFlags(
                WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN
            )
        }

        binding.ivPassword.setOnClickListener {
            switchPassword() }

        binding.btnDaftar.setOnClickListener{
            registerActivity()
        }

        binding.btnLogin.setOnClickListener{
            mainActivity()
        }

    }

    private fun registerActivity() {
        RegisterActivity.start(this)
        finish()
    }

    private fun mainActivity() {
        MainActivity.start(this)
        finish()
    }

    private fun switchPassword() {
        if (binding.ivPassword.tag.toString().equals("hidden")) {
            binding.ivPassword.tag = "show"
            binding.ivPassword.setImageDrawable(resources.getDrawable(R.drawable.ic_show_password))
            binding.etPassword.transformationMethod = HideReturnsTransformationMethod.getInstance()
        } else {
            binding.ivPassword.tag = "hidden"
            binding.ivPassword.setImageDrawable(resources.getDrawable(R.drawable.ic_hide_password))
            binding.etPassword.transformationMethod = PasswordTransformationMethod.getInstance()
        }
    }

    companion object {
        fun start(context: Context) {
            Intent(context, LoginActivity::class.java).apply {
                context.startActivity(this)
            }
        }
    }
}