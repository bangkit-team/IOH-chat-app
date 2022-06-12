import React,{useState} from 'react';
import "./announcement.css";

import authHeader from "../../context/authHeader";
import axios from "../../api/axios";

const API_URL = "/admin/announcement"

const Announcement = () => {
    if(authHeader().token === undefined){
        window.location.href="/";
    }

    const [divisi, setDivisi] = useState('');
    const [message, setMessage] = useState('');

    const handleAnnounce = async (e) => {
        e.preventDefault();

        var answer = window.confirm("Are you sure you have filled in the announcement correctly?")
        if(answer){
            try {
                await axios({
                    method: 'post',
                    url: API_URL,
                    headers: authHeader(),
                    data: {
                        nama_divisi: divisi,
                        message: message
                    }
                })
                window.location.href = "/home/announcement";
            } catch (err) {
                localStorage.removeItem("token");
                localStorage.removeItem("_id");
                window.location.href = "/";
            }
        }
    }


    return (
        <div>
            <div className="kotak-atas"></div>
            <div className="header-user container">
                <a href="/home">Back</a>
                <h1>IoH - Announcement Post </h1>
            </div>
            <div className="container">
            <form onSubmit={handleAnnounce}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Divisi Kerja</label>
                    <select class="form-select" aria-label="Default select example" onChange={(e) => setDivisi(e.target.value)} value={divisi}>
                        <option selected>Choose...</option>
                        <option value="Contact Center">Contact Center (CC)</option>
                        <option value="Call Center">Call Center - CC</option>
                        <option value="Digital">Digital - CC</option>
                        <option value="Customer Relation">Customer Relation - CC</option>
                        <option value="VIP Services">VIP Services - CC</option>
                        <option value="Customer Experience Excellence">Customer Experience Excellence (CEE)</option>
                        <option value="Retail Customer Experience">Retail Customer Experience - CEE</option>
                        <option value="Business Process & Training">Business Process & Training - CEE</option>
                        <option value="Service Quality & Exp Assurance">Service Quality & Exp Assurance - CEE</option>
                        <option value="Customer Journey">Customer Journey - CEE</option>
                        <option value="Collection & Billing Mgt">Collection & Billing Mgt (CBM)</option>
                        <option value="Collection & Payment">Collection & Payment - CBM</option>
                        <option value="Billing & Administration">Billing & Administration - CBM</option>
                        <option value="Verification & Credit Monitoring">Verification & Credit Monitoring - CBM</option>
                        <option value="Biz Support & Development">Biz Support & Development (BSD)</option>
                        <option value="Business Planning & Project Tracking">Business Planning & Project Tracking - BSD</option>
                        <option value="Infra Support & Tech Development">Infra Support & Tech Development - BSD</option>
                        <option value="CX Analytics & Insights">CX Analytics & Insights (CAI)</option>
                        <option value="CX Reporting Team">CX Reporting Team - CAI</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="mit" class="form-label">Message  (in text)</label>
                    <textarea class="form-control" onChange={(e) => setMessage(e.target.value)} value={message} id="mit"/>
                </div>
                <button type="submit" class="btn btn-primary">Announce</button>
            </form>
            </div>  
        </div>
    )

}

export default Announcement