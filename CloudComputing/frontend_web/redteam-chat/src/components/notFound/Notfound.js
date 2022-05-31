import React,{useEffect} from 'react';
import "./notfound.css";

const Notfound = () => {
    useEffect(()=>{
        window.location.href="/";
    })
    return (
        <div>
            <h1>Not Found Page</h1>
        </div>
    )
};

export default Notfound
