package com.example.ioh.ui.settings

import android.app.Dialog
import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.Toast
import androidx.lifecycle.ViewModelProvider
import com.example.ioh.R
import com.example.ioh.data.remote.local.DbHelper
import com.example.ioh.databinding.ActivityFeedbackBinding
import com.example.ioh.ui.MainActivity
import com.example.ioh.ui.ViewModelFactory
import com.example.ioh.utils.Const

class FeedbackActivity : AppCompatActivity(), View.OnClickListener {
    private lateinit var binding: ActivityFeedbackBinding
    private lateinit var idUser: String
    private lateinit var token: String
    private lateinit var viewModel: FeedbackViewModel
    private lateinit var prefHelper: DbHelper
    private lateinit var dialog: Dialog
    private lateinit var yesBtn: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityFeedbackBinding.inflate(layoutInflater)
        setContentView(binding.root)
        supportActionBar!!.hide()

        binding.backIcon.setOnClickListener(this)

        dialog = Dialog(this)
        dialog.setContentView(R.layout.feedback_dialog)

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            dialog.window?.setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))
        }

        dialog.window?.setLayout(
            ViewGroup.LayoutParams.WRAP_CONTENT,
            ViewGroup.LayoutParams.WRAP_CONTENT
        )
        dialog.setCancelable(false)
        dialog.window!!.attributes.windowAnimations = R.style.animation

        yesBtn = dialog.findViewById(R.id.yes_sent)

        prefHelper = DbHelper(this)
        val factory: ViewModelFactory = ViewModelFactory.getInstance(this)
        viewModel = ViewModelProvider(this, factory)[FeedbackViewModel::class.java]
        idUser = prefHelper.getString(Const.PREF_ID).toString()
        token = prefHelper.getString(Const.PREF_TOKEN).toString()

        binding.btnSend.setOnClickListener(this)
        yesBtn.setOnClickListener(this)
    }

    private fun addFeedback(token: String, id: String, feedback: String) {
        viewModel.addNewFeedback(token, id, feedback).observe(this) {
            when (it.code) {
                0 -> {
                    Toast.makeText(this, "Internal server error", Toast.LENGTH_SHORT).show()
                }
                1 -> {
                    dialog.show()
                }
                2 -> {
                    Toast.makeText(this, "Belum ada feedback", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    override fun onClick(view: View?) {
        when (view?.id) {
            R.id.backIcon -> {
                val intent = Intent(view.context, MainActivity::class.java)
                startActivity(intent);
            }
            R.id.yes_sent -> {
                MainActivity.start(this)
            }
            R.id.btn_send -> {
                val feedback = binding.etFeedback.text.toString().trim()

                if (feedback.isEmpty()) {
                    binding.etFeedback.error = FeedbackActivity.FIELD_REQUIRED
                    return
                }
                addFeedback(token, idUser, feedback)
            }
        }
    }

    companion object {
        fun start(context: Context) {
            Intent(context, FeedbackActivity::class.java).apply {
                context.startActivity(this)
            }
        }
        const val FIELD_REQUIRED = "Field tidak boleh kosong"
    }

}