import React,{useState,useEffect} from 'react';
import authHeader from '../../context/authHeader';
import "./feedback.css";

import database from '../../utils/firebase';
import { ref, onValue } from "firebase/database";

import { PieChart } from 'react-minimal-pie-chart';

const Feedback = () => {
    if(authHeader().token === undefined){
        window.location.href="/";
    }
    
    const back = (e) =>{
        e.preventDefault();
        window.location.href = "/home";
    }

    const [dataPositive, setDataPositive] = useState([]);
    const [dataNegative, setDataNegative] = useState([]);
    const [totalPositive, setTotalPositive] = useState([]);
    const [totalNegative, setTotalNegative] = useState([]);

    useEffect(()=>{
        const feedbackPositiveRef = ref(database, 'feedbacks/positive');
        onValue(feedbackPositiveRef, (snapshot) =>{
            let feedback = [];
            let i = 1
            snapshot.forEach((data) => {
                feedback = [...feedback,{
                    message: data.val().feedback,
                    timestamp: data.val().timestamp,
                    no: i
                }]
                i = i + 1
            })
            console.log(i);
            setDataPositive(feedback);
            setTotalPositive(i-1)
        })

        const feedbackNegativeRef = ref(database, 'feedbacks/negative');
        onValue(feedbackNegativeRef, (snapshot) =>{
            let feedback = [];
            let i = 1
            snapshot.forEach((data) => {
                feedback = [...feedback,{
                    message: data.val().feedback,
                    timestamp: data.val().timestamp,
                    no: i
                }]
                i = i + 1
            })
            setDataNegative(feedback);
            setTotalNegative(i-1);
        })
    }, []);

    const feedbackTablePositive = dataPositive.map((dataPositive) =>{
        return (
            <tr>
                <th scope="row">{dataPositive.no}</th>
                <td>{dataPositive.message}</td>
                <td>{dataPositive.timestamp}</td>
            </tr>
        )
    })

    const feedbackTableNegative = dataNegative.map((dataNegative) =>{
        return (
            <tr>
                <th scope="row">{dataNegative.no}</th>
                <td>{dataNegative.message}</td>
                <td>{dataNegative.timestamp}</td>
            </tr>
        )
    })

    const dataMock = [
        { title: 'Positive', value: totalPositive, color: 'darkgreen' },
        { title: 'Negative', value: totalNegative, color: 'darkred' },
    ];


    if(authHeader().token === undefined){
        window.location.href="/";
    }else{
        return (
        <div>
            <div className="kotak-atas"></div>
            <div className="header-user container">
                <div className="logout">
                    <button onClick={back}>
                        Back
                    </button>
                </div>
                <h1>IoH - Feedback User </h1>
            </div>

            <div className="pietable">
                <PieChart data={dataMock} style={{ height: '200px' }} />
                <div className="tablepie">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Color</th>
                                <th>Type</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Green</td>
                                <td>Positive</td>
                                <td>{totalPositive}</td>
                            </tr>
                            <tr>
                                <td>Red</td>
                                <td>Negative</td>
                                <td>{totalNegative}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="feedbackTable container">
                <div className="table-positive">
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Message Positive</th>
                            <th scope="col">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedbackTablePositive}
                        </tbody>
                    </table>
                </div>
                <div className="table-negative">
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Message Negative</th>
                            <th scope="col">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedbackTableNegative}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        )
    }
    
};

export default Feedback
