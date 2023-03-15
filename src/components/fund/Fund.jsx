import "./fund.scss"
import Navbar from "../navbar/Navbar";
import React, {useContext, useEffect, useState} from "react";
import {MyContext} from "../app/App";
import axios from "axios";

const Fund = () => {
    const [getSearchText, setSearchText] = useState("");
    const [priceSearch, setPriceSearch] = useState(0);
    const [allPrice, setAllPrice] = useState("");
    const [MainList, setMainList] = useState([]);
    const [getMonth,setGetMonth]=useState("");

    let value = useContext(MyContext);

    useEffect(() => {
        axios.get(`${value.url}/api/fund/`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            setMainList(response.data.items);
            setAllPrice(response.data.fund.fund);
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

    const filterList = () => {
        if (getMonth) {
            let year = getMonth.slice(0, 4);
            let month = getMonth.slice(5, 7);

            axios.get(`${value.url}/api/fund/`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                },
                params: {year: year, month: month}
            }).then((response) => {
                setMainList(response.data.items);
            });
        }
    };


    return <div className="incoming-container">
        <div className="container ForTitle">
            <Navbar/>
            <div className="title">Жамғарма</div>
        </div>
        <div className="content-box">
            <div className="section-one">
                <div className="left-side">
                    <input onChange={(e)=> setGetMonth(e.target.value)} type="month"/>
                    <button>
                        <img onClick={filterList} src="./images/setup.png" alt=""/>
                    </button>
                </div>

                <div className="right-side">
                    Умумий жамғарма: {allPrice}
                </div>
            </div>

            <div className="section-two">
                <div className="left-side">
                    <div className="inputs">
                        <input onChange={(e) => {
                            setSearchText(e.target.value);
                            let s=0;
                            MainList.filter((item) => {
                                return e.target.value.toLowerCase() === ""
                                    ? setPriceSearch(0)
                                    : item.source.toLowerCase().includes(e.target.value.toLowerCase());
                            }).map((item)=>{
                                s=s+Number(item.amount)
                            });
                            setPriceSearch(s);
                        }} id="search" placeholder="Излаш..."
                               type="text"/>
                        <button><img src="./images/search.png" alt=""/></button>
                    </div>

                    {priceSearch > 0 ? <div className="for-price">Jami qiymat: {priceSearch}</div> : ""}
                </div>
            </div>

            <div className="table-content">
                <table >
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Кимдан</th>
                        <th>Сана</th>
                        <th>Нарх</th>
                        <th>Неча фойиз жамғармага</th>
                        <th>Неч пул жамғармага</th>
                        <th>Маълумот</th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        MainList.filter((item) => {
                            return getSearchText.toLowerCase() === ""
                                ? item
                                : item.source.toLowerCase().includes(getSearchText.toLowerCase())
                        }).map((item, index) => {
                            return <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.source}</td>
                                <td>{item.date}</td>
                                <td>{item.amount}</td>
                                <td>{item.fund_percent}</td>
                                <td>{item.fund}</td>
                                <td>{item.description}</td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
};
export default Fund;