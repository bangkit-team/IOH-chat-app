package com.example.ioh.data.remote.local

import androidx.lifecycle.LiveData
import androidx.room.*

@Dao
interface UserDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insert(user: User)

    @Delete
    fun delete(user: User)

    @Query("SELECT EXISTS(SELECT id FROM user WHERE id = :userId)")
    fun getId(userId: String): LiveData<Boolean>

    @Query("SELECT EXISTS(SELECT token FROM user WHERE id = :userId)")
    fun getToken(userId: String): LiveData<Boolean>

    @Query("SELECT EXISTS(SELECT data FROM user WHERE id = :userId)")
    fun getUserData(userId: String): LiveData<Boolean>
}