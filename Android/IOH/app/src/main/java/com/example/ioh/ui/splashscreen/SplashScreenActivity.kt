package com.example.ioh.ui.splashscreen

import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.WindowInsets
import android.view.WindowManager
import com.example.ioh.databinding.ActivitySplashScreenBinding
import com.example.ioh.ui.login.LoginActivity
import kotlinx.coroutines.*
import kotlinx.coroutines.NonCancellable.start

class SplashScreenActivity : AppCompatActivity() {

    private lateinit var binding: ActivitySplashScreenBinding
    private val activityScope = CoroutineScope(Dispatchers.Main)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySplashScreenBinding.inflate(layoutInflater)
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

        activityScope.launch {
            delay(2000)
            runOnUiThread {
                loginActivity()
            }
        }

    }

    private fun loginActivity() {
        LoginActivity.start(this)
        finish()
    }

    override fun onStop() {
        super.onStop()
        activityScope.coroutineContext.cancelChildren()
    }

}