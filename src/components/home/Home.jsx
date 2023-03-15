import React, {useContext, useEffect, useState} from 'react';
import "./home.scss"
import Navbar from "../navbar/Navbar";
import {MyContext} from "../app/App";
import axios from "axios";

const Home = () => {
    const [prices,setPrices]=useState({});
    let value = useContext(MyContext);

    useEffect(() => {
        axios.get(`${value.url}/api/home/`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            setPrices(response.data)
        }).catch((error) => {
            if (error.response.statusText == "Unauthorized") {
                window.location.pathname= "/";
                localStorage.removeItem("userRole");
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                localStorage.removeItem("userName");
            }
        });

    }, []);

    return <div className="home-container">
        <div className="sloy">
            <div className="container">
                <Navbar/>

                <div className="all-prices">
                    Умумий қолган пул: {prices.final_income}
                </div>

                <div className="text-home">
                    <div className="sides">
                        <div className="prices">Бир ойлик кирим: <span>{prices.month_income} сўм</span></div>
                        <div className="prices">Бир ойлик чиқим: <span>{prices.month_expence} сўм</span></div>
                        <div className="prices">Умумий қарз миқдори: <span>{prices.loan} сўм</span></div>
                    </div>
                    <div className="sides">
                        <div className="prices">Бир кунлик кирим: <span>{prices.day_income}сўм</span></div>
                        <div className="prices">Бир кунлик чиқим: <span>{prices.day_expence} сўм</span></div>
                        <div className="prices">Умумий жамғарма миқдори: <span>{prices.fund} сўм</span></div>
                    </div>
                </div>
            </div>

        </div>
        </div>
};

export default Home