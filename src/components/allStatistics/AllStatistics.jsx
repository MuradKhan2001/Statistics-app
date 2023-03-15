import "./statistics.scss";
import React, {useContext, useEffect, useState} from "react";
import Navbar from "../navbar/Navbar";
import {MyContext} from "../app/App";
import axios from "axios";


const AllStatistics = () => {
    const [getSearchText, setSearchText] = useState("");
    let value = useContext(MyContext);
    const [MainList, setMainList] = useState([]);
    const [getYear,setGetYear]=useState("");
    const [getYearMain,setGetYearMain]=useState("");


    useEffect(() => {
        axios.get(`${value.url}/api/years/`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            setMainList(response.data.items);
            setGetYearMain(response.data.year)
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
        if (getYear) {
            let year = getYear;
            axios.get(`${value.url}/api/years/`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                },
                params: {year: year}
            }).then((response) => {
                setMainList(response.data.items);
                setGetYearMain(response.data.year)
            });
        }
    };

    return <div className="all-statistics">
        <div className="container ForTitle">
            <Navbar/>
            <div className="title">Умумий статистика</div>
        </div>

        <div className="content-box">
            <div className="section-one">
                <div className="left-side">
                    <input onChange={(e)=> setGetYear(e.target.value)} type="number" placeholder="YYYY" min="2017" max="3000"/>
                    <button>
                        <img onClick={filterList} src="./images/setup.png" alt=""/>
                    </button>
                </div>
            </div>

            <div className="section-two">
                <div className="text">{getYearMain}- йилги статистика</div>
            </div>

            <div className="table-content">
                <table>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Ой</th>
                        <th>Кирим</th>
                        <th>Чиқим</th>
                        <th>Жамғарма</th>
                        <th>Олинган қарз</th>
                        <th>Берилган қарз</th>
                        <th>Қолдиқ</th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        MainList.filter((item) => {
                            return getSearchText.toLowerCase() === ""
                                ? item
                                : item.name.toLowerCase().includes(getSearchText)
                        }).map((item, index) => {
                            return <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    {item.month.slice(5, 7) == 1 ? "Yanvar" : " "}
                                    {item.month.slice(5, 7) == 2 ? "Fevral" : " "}
                                    {item.month.slice(5, 7) == 3 ? "Mart" : " "}
                                    {item.month.slice(5, 7) == 4 ? "Aprel" : " "}
                                    {item.month.slice(5, 7) == 5 ? "May" : " "}
                                    {item.month.slice(5, 7) == 6 ? "Iyun" : " "}
                                    {item.month.slice(5, 7) == 7 ? "Iyul" : " "}
                                    {item.month.slice(5, 7) == 8 ? "Avgust" : " "}
                                    {item.month.slice(5, 7) == 9 ? "Sentabr" : " "}
                                    {item.month.slice(5, 7) == 10 ? "Oktabr" : " "}
                                    {item.month.slice(5, 7) == 11 ? "Noyabr" : " "}
                                    {item.month.slice(5, 7) == 12 ? "Dekabr" : " "}
                                </td>
                                <td>{item.income}</td>
                                <td>{item.expence}</td>
                                <td>{item.fund}</td>
                                <td>{item.loan}</td>
                                <td>{item.borrow}</td>
                                <td>{item.soft_amount}</td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
};

export default AllStatistics