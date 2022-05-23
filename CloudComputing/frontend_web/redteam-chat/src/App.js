import Login from './components/login/Login';
import Home from './components/home/Home';
import Notfound from './components/notFound/Notfound';

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

                <Route path="*" element={<Notfound/>}/>
            </Routes>
        </Router>
    
    </>
    )
}

export default App