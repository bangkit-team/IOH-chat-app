import React,{useState,useEffect} from 'react';
import authHeader from '../../context/authHeader';
import "./home.css";
import database from '../../utils/firebase';
import { ref, onValue} from "firebase/database";

import user from "../../user.jpg";
import group from "../../group.jpg";
import approve from "../../approval.png";
import announcement from "../../announcement.png";
import feedback from "../../feedback.png";

import axios from "../../api/axios";

const API_URL = "/admin/chat"

const Home = () => {
    const logout = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        window.location.href = "/";
    }

    const username = JSON.parse(localStorage.getItem("username"))

    const [data, setData] = useState([]);
    const [chat, setChat] = useState([]);

    const handleReadChat = async (e) => {
        e.preventDefault();
        try{
            const chatRef = ref(database, 'admin/chat');
            onValue(chatRef, (snapshot) =>{
                let chat = [];
                snapshot.forEach((data) => {
                    chat = [...chat,{
                        id: data.key,
                        message: data.val().message,
                        timestamp: data.val().timestamp,
                        sender: data.val().sender
                    }]
                })
                setData(chat);
            })
        }catch(error){
            localStorage.removeItem("token");
            localStorage.removeItem("id");
            window.location.href = "/";
        }
    }

    const handleSendChat = async (e) =>{
        e.preventDefault()
        try{
            await axios({
                method: 'post',
                url: API_URL,
                headers: authHeader(),
                data: {
                    sender: username,
                    message: chat,
                }
            })
            setChat('');
        }catch(error){
            localStorage.removeItem("token");
            localStorage.removeItem("id");
            window.location.href = "/";
        }
    }

    const chatCard = data.map((data) =>{
        if(username === data.sender){
            return (
                <div className='userChat'>
                    <p>{data.message} - {data.timestamp}</p>
                </div>
            )
        }else{
            return (
                <div className='otherChat'>
                    <ul>
                        <h6>{data.sender}</h6>
                        <p>{data.timestamp} - {data.message} </p>
                    </ul>
                </div>
            )
        }
    })

    if(authHeader().token === undefined){
        window.location.href="/";
    }else{
        return (
    <div>
        <div className="kotak-atas"></div>
        <div className="header-user container">
            <div className="logout">
                <button onClick={logout}>
                    Logout
                </button>
            </div>
            <h1>IoH - Chat App</h1>
            <form onSubmit={handleReadChat}>
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-backdrop="static" data-keyboard="false">Chat</button>
            </form>
        </div>
        <div className="container-home">
            <div className="card">
                <div className="head-card">
                    <img src={user} alt="card"/>
                </div>
                <div className="body-card">
                    <h2>All Users</h2>
                    <p>This is for see all users that already sign up in IoH - Chat App</p>
                    <div className="body-a">
                        <a href="/home/user">Next</a>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="head-card">
                    <img src={group} alt="card"/>
                </div>
                <div className="body-card">
                    <h2>All Groups</h2>
                    <p>This is for see all group that already made in IoH - Chat App</p>
                    <div className="body-a">
                        <a href="/home/group">Next</a>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="head-card">
                    <img src={approve} alt="card"/>
                </div>
                <div className="body-card">
                    <h2>Approval User</h2>
                    <p>This is for check new user to get approval from admin</p>
                    <div className="body-a">
                        <a href="/home/approval">Next</a>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="head-card">
                    <img src={announcement} alt="card"/>
                </div>
                <div className="body-card">
                    <h2>Announcement</h2>
                    <p>This is for add announcement regarding to specific role</p>
                    <div className="body-a">
                        <a href="/home/announcement">Next</a>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="head-card">
                    <img src={feedback} alt="card"/>
                </div>
                <div className="body-card">
                    <h2>Feedback Data</h2>
                    <p>Feedback category from user after Grouping by ML model</p>
                    <div className="body-a">
                        <a href="/home/feedback">Next</a>
                    </div>
                </div>
            </div>
        </div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Chat</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {chatCard}
                    </div>
                    <div className="modal-footer">
                        <form onSubmit={handleSendChat}>
                            <input type="text" className="form-control" onChange={(e) => setChat(e.target.value)} value={chat} id="chat" placeholder="type the message..."/>
                            <button type="submit" className="btn btn-secondary">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
        }
    

    
};

export default Home
