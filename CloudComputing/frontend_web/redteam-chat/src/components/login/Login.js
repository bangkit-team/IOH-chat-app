import { useRef, useState, useEffect} from 'react';

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
                localStorage.setItem("id", JSON.stringify(response.data.id))
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
        <div>
            <div className="kotak-atas"></div>
            <div className="Login">
            <section>
                <img src={logo} alt="logo"/>
                <h3 className="sign-h1">Sign In</h3>
                <hr></hr>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} value={username} required/>

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" onChange={(e) => setPwd(e.target.value)} value={password} required/>
                    <button>Sign In</button>
                </form>
            </section>
            </div>
        </div>
        </>
    )
}

export default Login