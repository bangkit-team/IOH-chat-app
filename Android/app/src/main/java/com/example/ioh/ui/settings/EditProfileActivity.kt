package com.example.ioh.ui.settings

import android.app.AlertDialog
import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.provider.MediaStore
import android.view.View
import androidx.core.app.ActivityCompat
import com.bumptech.glide.Glide
import com.bumptech.glide.request.RequestOptions
import com.example.ioh.R
import com.example.ioh.data.model.DataItemUser
import com.example.ioh.data.remote.local.DbHelper
import com.example.ioh.databinding.ActivityEditProfileBinding
import com.example.ioh.ui.MainActivity
import com.example.ioh.utils.Const
import com.google.gson.Gson

class EditProfileActivity : AppCompatActivity(), View.OnClickListener {
    private lateinit var binding: ActivityEditProfileBinding
    private lateinit var gson: Gson
    private lateinit var prefHelper: DbHelper

//    private lateinit var selectedImages: String

    private lateinit var dataUser: DataItemUser

    private var options = arrayOf("Camera", "Gallery", "Cancel")

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityEditProfileBinding.inflate(layoutInflater)
        setContentView(binding.root)
        supportActionBar?.hide()
        binding.backIcon.setOnClickListener(this)

        prefHelper = DbHelper(this)
        gson = Gson()
        val json = prefHelper.getString(Const.PREF_USER)
        dataUser = gson.fromJson(json, DataItemUser::class.java)

        binding.edtName.setText(dataUser.name)
        binding.edtPhoneNum.setText(dataUser.phone_number)
        binding.edtAbout.setText(dataUser.about)
        Glide.with(this)
            .load(dataUser.profile_pict)
            .apply(
                RequestOptions()
                    .placeholder(R.drawable.ic_launcher_foreground)
            )
            .into(binding.selectImage)

        binding.selectImage.setOnClickListener(this)
    }

    override fun onClick(view: View?) {
        when (view?.id) {
            R.id.backIcon -> {
                val intent = Intent(view.context, MainActivity::class.java)
                intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)
                startActivity(intent);
            }
            R.id.select_image -> {
                ActivityCompat.requestPermissions(
                    this,
                    arrayOf(android.Manifest.permission.WRITE_EXTERNAL_STORAGE),
                    1
                )
                val builder = AlertDialog.Builder(this)
                builder.setTitle("Select Image")
                builder.setItems(options) { dialog, which ->
                    if (options[which].equals("Camera")) {
                        val takePic = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
                        startActivityForResult(takePic, 0)
                    } else if (options[which].equals("Gallery")) {
                        val gallery =
                            Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI)
                        startActivityForResult(gallery, 1)
                    } else {
                        dialog.dismiss()
                    }
                }
                builder.show()
            }
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if (resultCode != RESULT_CANCELED) {
            when (requestCode) {
                0 -> {
                    if (resultCode == RESULT_OK && data != null) {
                        val bitmap: Bitmap = data.extras?.get("data") as Bitmap
                        binding.selectImage.setImageBitmap(bitmap)
                    }
                }
                1 -> {
                    if (resultCode == RESULT_OK && data != null) {
                        val bitmap: Bitmap = MediaStore.Images.Media.getBitmap(this.contentResolver, data.data!!)
                        binding.selectImage.setImageBitmap(bitmap)
                    }
                }
            }
        }
    }

//    private fun getImageUrl(context: Context, bitmap: Bitmap): Uri {
//        val path =
//            MediaStore.Images.Media.insertImage(context.contentResolver, bitmap, "myImage", "")
//        return Uri.parse(path)
//    }

    companion object {
        fun start(context: Context) {
            val intent = Intent(context, EditProfileActivity::class.java)
            context.startActivity(intent)
        }
    }
}