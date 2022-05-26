import Login from './components/login/Login';
import Home from './components/home/Home';
import Notfound from './components/notFound/Notfound';
import User from './components/user/User';
import Group from './components/group/Group';
import Approval from './components/approval/Approval';

import React from 'react'

import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

function App(){
    return(
    <>
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>

                <Route path="/home" element={<Home/>}/>

                <Route path="/home/user" element={<User/>}/>

                <Route path="/home/group" element={<Group/>}/>

                <Route path="/home/approval" element={<Approval/>}/>

                <Route path="*" element={<Notfound/>}/>
            </Routes>
        </Router>
    
    </>
    )
}

export default App