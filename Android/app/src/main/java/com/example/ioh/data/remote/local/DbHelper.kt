package com.example.ioh.data.remote.local

import android.content.Context
import android.content.SharedPreferences
import com.example.ioh.data.model.DataItemUser
import com.google.gson.Gson

class DbHelper(context: Context) {

    private val PREFS_NAME = "redteam"
    private var sharedPref: SharedPreferences
    val editor: SharedPreferences.Editor

    init {
        sharedPref = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
        editor = sharedPref.edit()
    }

    fun put(key: String, value: Boolean) {
        editor.putBoolean(key, value)
            .apply()
    }

    fun put(key: String, value: Set<String>){
        editor.putStringSet(key, value).apply()
    }

    fun getBoolean(key: String): Boolean {
        return sharedPref.getBoolean(key, false)
    }

    fun delete(key: String){
        editor.remove(key).apply()
    }

    fun put(key: String, value: String) {
        editor.putString(key, value)
            .apply()
    }

    fun getString(key: String): String? {
        return sharedPref.getString(key, null)
    }

    fun clear() {
        editor.clear()
            .apply()
    }
}