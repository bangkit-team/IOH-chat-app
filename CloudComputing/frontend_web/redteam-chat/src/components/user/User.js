import React,{useState,useEffect} from 'react';
import "./user.css";

import card from "../../card.jpg";

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
        if(authHeader().token === undefined){
            window.location.href="/";
        }
        getAllUsers()
    },[])

    return(
        <div>
            <div className="kotak-atas"></div>
            <h1>IoH - Users Chat </h1>
            <div class="row justify-content-center">
                <div class="col-md-2 mb-3">
                    <div class="card" data-aos="flip-right">
                        <img src={data[3][2]} class="card-img-top" alt="project1"/>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">ger</li>
                            <li class="list-group-item">A second item</li>
                            <li class="list-group-item">A third item</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default User