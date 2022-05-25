import React,{useEffect} from 'react';
import authHeader from '../../context/authHeader';
import "./home.css";

const Home = () => {
    const logout = () =>{
        localStorage.removeItem("token");
        window.location.href = "/";
    }

    useEffect(()=>{
        if(authHeader().token == undefined){
            window.location.href="/";
        }
    })

    return (
        <div>
            <a href="">All Users</a>
            <a href="">All Groups</a>
            <a href="">Announcement</a>
            
            <button onClick={logout}>
                Logout
            </button>
        </div>
    )
};

export default Home
