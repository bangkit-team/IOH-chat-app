import React,{useState,useEffect} from 'react';
import "./group.css";

import card from "../../card.jpg";

import authHeader from "../../context/authHeader";
import axios from "../../api/axios";

const API_URL = "/admin/groups";
const API_URL_MEMBER = "/admin/groups/member";

const Group = () => {
    if(authHeader().token === undefined){
        window.location.href="/";
    }

    const [data, setData] = useState([]);
    const [dataMember, setMember] = useState([]);

    const fetchData = async () =>{
        try{
            const results = await axios.get(API_URL, {headers: authHeader() })
            setData(results.data.snapshot)
        }catch(error){
            localStorage.removeItem("token");
            localStorage.removeItem("_id");
            window.location.href = "/";
        }
    }

    const handleMember = async (e) => {
        e.preventDefault();
        try {
            const id = e.target.id.value
            console.log(id)
            const results = await axios({
                method: 'get',
                url: API_URL_MEMBER+'/'+id,
                headers: authHeader(),
            })
            setMember(results.data.snapshot)
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
                <img className='profile-picture' src={data?.group_pict? data.group_pict : card } alt="profile-picture"></img>
                <li className="list-group-item">{data.name}</li>
                <li className="list-group-item">{data.created_at}</li>
                <form onSubmit={handleMember}>
                    <input type="hidden" name="id" id="id" value={data.id}/>
                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">All Member</button>
                </form>
            </ul>
            </div>
        </div>)
    })

    const memberCard = dataMember.map((dataMember) =>{
        return (
            <div>
                <ul>
                    <li className="list-group-item">{dataMember.email}</li>
                    <li className="list-group-item">{dataMember.group_role}</li>
                </ul>
            </div>
        )
    })

    useEffect(()=>{
        fetchData()
    }, []);

    return(
            <div>
                <div className="kotak-atas"></div>
                <div className="header-user container">
                    <a href="/home">Back</a>
                    <h1>IoH - Groups Room </h1>
                </div>
                <div className="container">
                    <div className="row">
                        {listCard}   
                    </div>
                </div>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {memberCard}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default Group

