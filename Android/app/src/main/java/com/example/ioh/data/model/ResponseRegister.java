package com.example.ioh.data.model;

import com.google.gson.annotations.SerializedName;

public class ResponseRegister{

	@SerializedName("message")
	private String message;

	@SerializedName("code")
	private Integer code;

	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public void setMessage(String message){
		this.message = message;
	}

	public String getMessage(){
		return message;
	}

	@Override
 	public String toString(){
		return 
			"ResponseRegister{" + 
			"message = '" + message + '\'' + 
			"}";
		}
}