import React,{useState,useEffect} from 'react';
import "./user.css";

import authHeader from "../../context/authHeader";
import axios from "../../api/axios";

const API_URL = "/admin/users"

const User = () => {
    const [data,setData]=useState([]);

    const getAllUsers = async () =>{
        await axios.get(API_URL, {headers: authHeader()}).then(
            (response) =>{
                setData(response.data.snapshot);
            },
            (error) =>{
                console.log(error);
            }
        )
    }

    useEffect(()=>{
        if(authHeader().token == undefined){
            window.location.href="/";
        }
        getAllUsers()
    },[])

    return(
        <div>
            <h1>{data[0][1]}</h1>
        </div>
    )
};

export default User