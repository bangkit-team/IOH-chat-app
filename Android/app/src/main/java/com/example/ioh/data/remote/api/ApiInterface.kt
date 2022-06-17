package com.example.ioh.data.remote.api

import com.example.ioh.data.model.*
import com.google.gson.JsonObject
import okhttp3.MultipartBody
import okhttp3.RequestBody
import org.json.JSONObject
import retrofit2.Call
import retrofit2.http.*

interface ApiInterface {
    //POST REQUEST
    @POST("user")
    @FormUrlEncoded
    fun apiRegister(
        @Field("divisi_kerja") divisi_kerja : String,
        @Field("email") email: String,
        @Field("fpassword") fpassword : String,
        @Field("name") name: String,
        @Field("password") password: String,
        @Field("phone_number") phone_number: String,
        @Field("posisi") posisi : String
    ): Call<ResponseRegister>

    @POST("login")
    @FormUrlEncoded
    fun login(
        @Field("email") email: String,
        @Field("password") password:String
    ): Call<ResponseLogin>

    @POST("user/{id}")
    @FormUrlEncoded
    fun addFriend(
        @Header("token") token: String,
        @Header("id") id: String,
        @Path("id") idUser: String,
        @Field("email") email: String
    ): Call<ResponseNewFriend>

    @POST("feedback")
    @FormUrlEncoded
    fun addNewFeedback(
        @Header("token") token: String,
        @Header("id") id: String,
        @Field("feedback") feedback: String,
    ): Call<ResponseFeedback>

    @Headers(
        "Accept: application/json",
        "Content-Type: application/json"
    )
    @POST("translate")
    fun translateMessage(
        @Header("token") token: String,
        @Header("id") id: String,
        @Body translate: DataItemTranslate,
    ): Call<ResponseTranslateML>

    @Multipart
    @POST("user/{id}")
    fun editUser(
        @Header("token") token: String,
        @Header("id") id: String,
        @Path("id") idUser: String,
        @Part("phone_number ") phone: String,
        @Part("about") about: String,
        @Part profile_pict: MultipartBody.Part,
    ): Call<ResponseEditProfile>

    //GET REQUEST
    @GET("user/{id}")
    fun getActiveUser(
        @Header("token") token: String,
        @Header("id") id: String,
        @Path("id") idUser: String
    ): Call<ResponseGetUser>

    @GET("user/{id}/announcement/{divisi_kerja}")
    fun getAnnouncement(
        @Header("token") token: String,
        @Header("id") id: String,
        @Path("id") idUser: String,
        @Path("divisi_kerja") divisi_kerja: String,
    ): Call<ResponseAnnouncement>
}