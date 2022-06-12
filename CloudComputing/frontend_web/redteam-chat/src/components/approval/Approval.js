import React,{useState,useEffect} from 'react';
import "./approval.css";
import database from '../../utils/firebase';
import { ref, onValue } from "firebase/database";


import card from "../../card.jpg";


import authHeader from "../../context/authHeader";
import axios from "../../api/axios";

const API_URL = "/admin/user/approve"

const Approval = () => {
    if(authHeader().token === undefined){
        window.location.href="/";
    }

    const [data, setData] = useState([]);

    const handleApprove = async (e) => {
        e.preventDefault();

        try {
            const approve=true
            const id = e.target.id.value
            const response = await axios({
                method: 'post',
                url: API_URL,
                headers: authHeader(),
                data: {
                    approve: approve,
                    id: id,
                }
            })
            window.location.href = "/home/approval";
        } catch (err) {
            localStorage.removeItem("token");
            localStorage.removeItem("_id");
            window.location.href = "/";
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
        const approveRef = ref(database, 'users');
        onValue(approveRef, (snapshot) =>{
            let approve = [];
            snapshot.forEach((data) => {
                if(data.val().approve === false){
                    approve = [...approve,{
                        id: data.key,
                        name: data.val().name,
                        email: data.val().email,
                        timestamp: data.val().timestamp,
                        profile_pict: data.val().profile_pict,
                        posisi: data.val().posisi,
                        divisi_kerja: data.val().divisi_kerja
                    }]
                }
            })
            setData(approve);
        })
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
