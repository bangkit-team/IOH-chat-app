import React,{useState,useEffect} from 'react';
import "./user.css";

import card from "../../card.jpg";

import authHeader from "../../context/authHeader";
import axios from "../../api/axios";

const API_URL = "/admin/users"

const User = () => {
    if(authHeader().token === undefined){
            window.location.href="/";
    }

    const [data, setData] = useState([]);
 
    const fetchData = async () =>{
        const results = await axios.get(API_URL, { headers: authHeader() })
        setData(results.data.snapshot)
    }

    const listCard = data.map((data) => {
        return (
            <div className='col-4'>
            <div key={data.name} className="card" data-aos="flip-right">
            <ul className="list-group list-group-flush">
                <img className='profile-picture' src={data?.profile_pict? data.profile_pict : card } alt="profile-picture"></img>
                <li className="list-group-item">{data.name}</li>
                <li className="list-group-item">{data.email}</li>
                <li className="list-group-item">{data.divisi_kerja}</li>
                <li className="list-group-item">{data.posisi}</li>
            </ul>
            </div>
        </div>)
        
    })

    useEffect(()=>{
        
        fetchData()
    }, []);

    return(
                <div>
                    <div className="kotak-atas"></div>
                    <div className="header-user container">
                        <a href="/home">Back</a>
                        <h1>IoH - Users Chat </h1>
                    </div>
                    <div className="container">
                        <div className="row">
                            {listCard}   
                        </div>
                    </div>
                </div>
            )
        
    
};

export default User