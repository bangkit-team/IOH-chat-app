import React,{useState,useEffect} from 'react';
import "./announcement.css";

import authHeader from "../../context/authHeader";
import axios from "../../api/axios";

const API_URL = "/admin/user/announcement"

const Announcement = () => {

    return (
        <div>
            <div className="kotak-atas"></div>
            <div className="header-user container">
                <a href="/home">Back</a>
                <h1>IoH - Announcement Post </h1>
            </div>
            <div className="container">

            </div>  
        </div>
    )

}

export default Announcement