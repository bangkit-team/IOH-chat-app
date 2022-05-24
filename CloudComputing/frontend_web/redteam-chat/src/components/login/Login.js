import { useRef, useState, useEffect, useContext } from 'react';

import "./login.css"
import logo from "../../IoHLogo.png";

import axios from '../../api/axios';
const LOGIN_URL = '/admin';

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUser] = useState('');
    const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            if(response?.data?.token){
                localStorage.setItem("token", JSON.stringify(response.data.token))
                localStorage.setItem("_id", JSON.stringify(response.data._id))
            }
            setUser('');
            setPwd('');
            window.location.href = "/home";
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
        <div className="Login">
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    <img src={logo}/>
                    <h1>Login</h1>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} value={username} required/>

                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" onChange={(e) => setPwd(e.target.value)} value={password} required/>
                        <button>Login</button>
                    </form>
                </section>
            )}
        </div>
        </>
    )
}

export default Login