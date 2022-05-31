import React,{useState,useEffect} from 'react';
import "./approval.css";

import card from "../../card.jpg";

import authHeader from "../../context/authHeader";
import axios from "../../api/axios";

const API_URL = "/admin/user/approve"

const Approval = () => {
    if(authHeader().token === undefined){
        window.location.href="/";
    }

    const [data, setData] = useState([]);

    const fetchData = async () =>{
        const results = await axios.get(API_URL, { headers: authHeader() })
        setData(results.data.approve)
    }

    const handleApprove = async (e) => {
        e.preventDefault();

        try {
            const approve=true
            const id = e.target.id.value
            await axios.post(API_URL,
                JSON.stringify({approve, id}),
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        'token': authHeader().token,
                        '_id': authHeader()._id
                    },
                    withCredentials: true
                }
            );
            window.location.href = "/home/approval";
        } catch (err) {
            console.log(err)
        }
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
                <li className="list-group-item">{data.timestamp}</li>
                <form onSubmit={handleApprove}>
                    <input type="hidden" name="id" id="id" value={data.id}/>
                    <button className="btn btn-success">Approve</button>
                </form>
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
                        <h1>IoH - Approve New User </h1>
                    </div>
                    <div className="container">
                        <div className="row">
                            {listCard} 
                        </div>
                    </div>
                </div>
            )
}

export default Approval
