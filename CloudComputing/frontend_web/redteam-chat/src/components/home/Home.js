import React,{useEffect} from 'react';
import authHeader from '../../context/authHeader';
import "./home.css";

import card from "../../card.jpg";

const Home = () => {
    const logout = () =>{
        localStorage.removeItem("token");
        window.location.href = "/";
    }

    useEffect(()=>{
        if(authHeader().token === undefined){
            window.location.href="/";
        }
    })

    return (
        <div>
            <div className="kotak-atas"></div>
            <h1>IoH - Chat App</h1>
            <div className="container">
                <div class="card">
                    <div class="head-card">
                        <img src={card} alt="card"/>
                    </div>
                    <div class="body-card">
                        <h2>All Users</h2>
                        <p>This is for see all users that already sign up in IoH - Chat App</p>
                        <div className="body-a">
                            <a href="/home/user">Next</a>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="head-card">
                        <img src={card} alt="card"/>
                    </div>
                    <div class="body-card">
                        <h2>All Groups</h2>
                        <p>This is for see all users that already sign up in IoH - Chat App</p>
                        <div className="body-a">
                            <a href="/login">Next</a>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="head-card">
                        <img src={card} alt="card"/>
                    </div>
                    <div class="body-card">
                        <h2>Approval User</h2>
                        <p>This is for see all users that already sign up in IoH - Chat App</p>
                        <div className="body-a">
                            <a href="/login">Next</a>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="head-card">
                        <img src={card} alt="card"/>
                    </div>
                    <div class="body-card">
                        <h2>Announcement</h2>
                        <p>This is for see all users that already sign up in IoH - Chat App</p>
                        <div className="body-a">
                            <a href="/login">Next</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="logout">
                <button onClick={logout}>
                            Logout
                </button>
            </div>
        </div>
    )
};

export default Home
