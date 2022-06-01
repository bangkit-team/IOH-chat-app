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
            <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Divisi Kerja</label>
                    <select class="form-select" aria-label="Default select example">
                        <option selected>Choose...</option>
                        <option value="1">Contact Center (CC)</option>
                        <option value="2">Call Center - CC</option>
                        <option value="3">Digital - CC</option>
                        <option value="3">Customer Relation - CC</option>
                        <option value="3">VIP Services - CC</option>
                        <option value="3">Customer Experience Excellence (CEE)</option>
                        <option value="3">Retail Customer Experience - CEE</option>
                        <option value="3">Business Process & Training - CEE</option>
                        <option value="3">Service Quality & Exp Assurance - CEE</option>
                        <option value="3">Customer Journey - CEE</option>
                        <option value="3">Collection & Billing Mgt (CBM)</option>
                        <option value="3">Billing & Administration - CBM</option>
                        <option value="3">Verification & Credit Monitoring - CBM</option>
                        <option value="3">Biz Support & Development (BSD)</option>
                        <option value="3">Business Planning & Project Tracking - BSD</option>
                        <option value="3">Infra Support & Tech Development - BSD</option>
                        <option value="3">CX Analytics & Insights (CAI)</option>
                        <option value="3">CX Reporting Team - CAI</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="mit" class="form-label">Message  (in text)</label>
                    <input type="text" class="form-control" id="mit"/>
                </div>
                <div class="mb-3">
                    <label for="mifg" class="form-label">Message  (in Picture or File)</label>
                    <input type="file" class="form-control" id="mifg"/>
                </div>
                <button type="submit" class="btn btn-primary">Announce</button>
            </form>
            </div>  
        </div>
    )

}

export default Announcement