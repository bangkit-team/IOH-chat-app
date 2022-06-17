package com.example.ioh.ui.splashscreen
import android.annotation.SuppressLint
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.WindowInsets
import android.view.WindowManager
import com.example.ioh.data.remote.local.DbHelper
import com.example.ioh.databinding.ActivitySplashscreenBinding
import com.example.ioh.ui.MainActivity
import com.example.ioh.ui.login.LoginActivity
import com.example.ioh.utils.Const
import kotlinx.coroutines.*

@SuppressLint("CustomSplashScreen")
class SplashScreenActivity : AppCompatActivity() {

    private lateinit var binding: ActivitySplashscreenBinding
    private val activityScope = CoroutineScope(Dispatchers.Main)
    private lateinit var prefHelper: DbHelper

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySplashscreenBinding.inflate(layoutInflater)
        setContentView(binding.root)
        prefHelper = DbHelper(this)
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
                if (prefHelper.getBoolean(Const.PREF_IS_FIRST)){
                    mainActivity()
                    finish()
                }else{
                    loginActivity()
                    finish()
                }
            }
        }

    }

    private fun loginActivity() {
        LoginActivity.start(this)
        finish()
    }

    private fun mainActivity() {
        MainActivity.start(this)
        finish()
    }

    override fun onStop() {
        super.onStop()
        activityScope.coroutineContext.cancelChildren()
    }
}