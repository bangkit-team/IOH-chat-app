package com.example.ioh.ui.register

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.text.method.HideReturnsTransformationMethod
import android.text.method.PasswordTransformationMethod
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.core.view.get
import androidx.lifecycle.ViewModelProvider
import com.example.ioh.R
import com.example.ioh.databinding.ActivityRegisterBinding
import com.example.ioh.ui.ViewModelFactory
import com.example.ioh.ui.login.LoginActivity
import com.shashank.sony.fancytoastlib.FancyToast

class RegisterActivity : AppCompatActivity(), View.OnClickListener{

    private lateinit var binding: ActivityRegisterBinding
    private lateinit var viewModel: ViewModelRegister
    private lateinit var pilih_divisi : String
    private lateinit var pilih_posisi : String

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)
        supportActionBar?.hide()

        val divisi = resources.getStringArray(R.array.array_divisi)
        val posisi = resources.getStringArray(R.array.array_posisi)
        binding.btnLogin.setOnClickListener(this)
        binding.btnDaftar.setOnClickListener(this)
        binding.ivPassword.setOnClickListener(this)
        val adapter = ArrayAdapter(
            this,
            android.R.layout.simple_spinner_item, divisi
        )
        binding.spinnerDivisi.adapter = adapter
        binding.spinnerDivisi.onItemSelectedListener = object :
            AdapterView.OnItemSelectedListener {
            override fun onItemSelected(
                parent: AdapterView<*>,
                view: View, position: Int, id: Long
            ) {
                pilih_divisi = divisi[position]
            }

            override fun onNothingSelected(parent: AdapterView<*>) {
                // write code to perform some action
            }
        }

        val adapterposisi = ArrayAdapter(
            this,
            android.R.layout.simple_spinner_item, posisi
        )
        binding.spinnerJob.adapter = adapterposisi
        binding.spinnerJob.onItemSelectedListener = object :
            AdapterView.OnItemSelectedListener {
            override fun onItemSelected(
                parent: AdapterView<*>,
                view: View, position: Int, id: Long
            ) {
                pilih_posisi = posisi[position]
            }

            override fun onNothingSelected(parent: AdapterView<*>) {
                // write code to perform some action
            }
        }

        val factory: ViewModelFactory = ViewModelFactory.getInstance(applicationContext)
        viewModel = ViewModelProvider(this, factory)[ViewModelRegister::class.java]
    }

    private fun loginActivity() {
        LoginActivity.start(this)
        finish()
    }

    companion object {
        fun start(context: Context) {
            Intent(context, RegisterActivity::class.java).apply {
                context.startActivity(this)
            }
        }

        const val FIELD_REQUIRED = "Field tidak boleh kosong"
        const val FIELD_IS_NOT_VALID = "Email tidak valid"
    }

    override fun onClick(view: View) {
        when (view.id) {
            R.id.iv_password -> {
                switchPassword()
            }
            R.id.btnDaftar -> {

                val email = binding.edtEmail.text.toString().trim()
                val password = binding.etPassword.text.toString().trim()
                val nama = binding.edtName.text.toString().trim()
                val telepon = binding.edtTelepon.text.toString().trim()


                if (email.isEmpty()) {
                    binding.edtEmail.error = FIELD_REQUIRED
                    return
                }

                if (!isValidEmail(email)) {
                    binding.edtEmail.error = FIELD_IS_NOT_VALID
                    return
                }

                if (nama.isEmpty()){
                    binding.edtName.error = FIELD_REQUIRED
                    return
                }


                if (telepon.isEmpty()){
                    binding.edtTelepon.error = FIELD_REQUIRED
                    return
                }

                register(nama,pilih_posisi,pilih_divisi,email,password,password,telepon)

            }
            R.id.btnLogin -> {
                val mIntent = Intent(this@RegisterActivity, LoginActivity::class.java)
                startActivity(mIntent)
            }
        }
    }

    private fun switchPassword() {
        if (binding.ivPassword.tag.toString() == "hidden") {
            binding.ivPassword.tag = "show"
            binding.ivPassword.setImageDrawable(
                ContextCompat.getDrawable(this, R.drawable
                .ic_show_password))
            binding.etPassword.transformationMethod = HideReturnsTransformationMethod.getInstance()
        } else {
            binding.ivPassword.tag = "hidden"
            binding.ivPassword.setImageDrawable(
                ContextCompat.getDrawable(this, R.drawable
                .ic_hide_password))
            binding.etPassword.transformationMethod = PasswordTransformationMethod.getInstance()
        }
    }

    private fun register(
        divisi: String,
        email: String,
        fpassowrd: String,
        nama: String,
        password: String,
        telepon: String,
        posisi: String, ) {
        viewModel.register(divisi,email,fpassowrd,nama,password,telepon,posisi)
            .observe(this){
                when (it.code){
                    0 -> {
                        FancyToast.makeText(this@RegisterActivity, it.message,
                            FancyToast.LENGTH_LONG, FancyToast.WARNING, false).show()
                    }
                    1 -> {
                        FancyToast.makeText(this@RegisterActivity, it.message,
                            FancyToast.LENGTH_LONG, FancyToast.SUCCESS, false).show()
                    }
                    2 -> {
                        FancyToast.makeText(this@RegisterActivity, it.message,
                            FancyToast.LENGTH_LONG, FancyToast.ERROR, false).show()
                    }
                    3 -> {
                        FancyToast.makeText(this@RegisterActivity, it.message,
                            FancyToast.LENGTH_LONG, FancyToast.ERROR, false).show()
                    }
                }
        }
    }

    private fun isValidEmail(email: CharSequence): Boolean {
        return android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()
    }

}