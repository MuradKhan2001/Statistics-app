import React, {useContext, useEffect, useRef, useState} from "react";
import "./outgoing.scss"
import Navbar from "../navbar/Navbar";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {MyContext} from "../app/App";
import axios from "axios";

const OutgoingMoney = () => {
    const [checkBtn, setCheckBtn] = useState(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [MainList, setMainList] = useState([]);
    const [getMoth, setGetMoth] = useState();
    const [getSearchText, setSearchText] = useState("");
    const [addName, setAddName] = useState(false);
    const [priceSearch, setPriceSearch] = useState(0);
    const [allPrice, setAllPrice] = useState("");
    const [source, setSource] = useState([]);
    const [sourceName, setSourceName] = useState("");
    const [editId, setEditId] = useState("");
    const [sourceId, setSourceId] = useState("");

    let value = useContext(MyContext);

    const [list, setList] = useState(
        {
            source_expence: "",
            amount: 0,
            description: "Йўқ",
            date: "",
            source: ""
        }
    );

    const getInputs = (e) => {
        list[e.target.name] = e.target.value;
    };

    const getSource = (e) => {
        list[e.target.name] = e.target.value;
        setSourceId(e.target.value)
    };

    useEffect(() => {
        axios.get(`${value.url}/api/expence/`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            setMainList(response.data.items);
            setAllPrice(response.data.expence);

        }).catch((error) => {
            if (error.response.statusText == "Unauthorized") {
                window.location.pathname = "/";
                localStorage.removeItem("userRole");
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                localStorage.removeItem("userName");
            }
        });

        axios.get(`${value.url}/api/expencesource/`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            setSource(response.data)

        }).catch((error) => {
            if (error.response.statusText == "Unauthorized") {
                window.location.pathname = "/";
                localStorage.removeItem("userRole");
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                localStorage.removeItem("userName");
            }
        });

    }, []);

    const addList = () => {
        if (list.source > 0 && list.amount > 0 && list.date && list.source_expence.length > 0) {
            let lists = {
                user: localStorage.getItem("userId"),
                source: list.source,
                amount: list.amount,
                description: list.description,
                date: list.date,
                source_expence: list.source_expence
            };

            axios.post(`${value.url}/api/expence/`, lists, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }).then(() => {

                axios.get(`${value.url}/api/expence/`,{
                    headers: {
                        "Authorization": `Token ${localStorage.getItem("token")}`
                    }
                }).then((response) => {
                    setMainList(response.data.items);
                    setAllPrice(response.data.expence);
                });
                let newList = {
                    source_expence: "",
                    amount: 0,
                    description: "Йўқ",
                    date: "",
                    source: ""
                };
                setList(newList);
                handleClose();
            }).catch((error) => {

            });

        } else alert("Formani to'ldiring")
    };

    const delList = (id) => {
        axios.delete(`${value.url}/api/expence/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then(() => {
            axios.get(`${value.url}/api/expence/`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }).then((response) => {
                setAllPrice(response.data.expence);
                setMainList(response.data.items);
            })
        }).catch(() => {
        });
    };

    const editList = () => {
        let lists = {
            user: localStorage.getItem("userId"),
            source_expence: list.source_expence,
            amount: list.amount,
            description: list.description,
            date: list.date,
            source: list.source
        };

        axios.put(`${value.url}/api/expence/${editId}/`, lists, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then(() => {
            axios.get(`${value.url}/api/expence/`,{
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }).then((response) => {
                setAllPrice(response.data.expence);
                setMainList(response.data.items);
            });
            setCheckBtn(true);
            let newList = {
                source_expence: "",
                amount: 0,
                description: "Йўқ",
                date: "",
                source: ""
            };
            setList(newList)
        }).catch((error) => {

        });
    };

    const editList2 = (index) => {
        let sourceId = 0;
        source.filter((item) => {
            if (item.name === MainList[index].source) {
                sourceId = item.id
            }
        });

        let newList = {
            source: sourceId,
            amount: Number(MainList[index].amount.replace(",","")),
            description: MainList[index].description,
            date: MainList[index].date,
            source_expence: MainList[index].source_expence
        };
        setList(newList);

        document.getElementById('source').value = sourceId;
        document.getElementById('amount').value = Number(MainList[index].amount.replace(",",""));
        document.getElementById('description').value = MainList[index].description;
        document.getElementById('source_expence').value = MainList[index].source_expence;
        document.getElementById('date').value = MainList[index].date;
    };

    const filterList = () => {
        if (getMoth) {
            let year = getMoth.slice(0, 4);
            let month = getMoth.slice(5, 7);

            axios.get(`${value.url}/api/expence/`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                },
                params: {year: year, month: month}
            }).then((response) => {
                setAllPrice(response.data.expence);
                setMainList(response.data.items);
            });
        }
    };

    const addSource = () => {
        if (sourceName.trim().length > 0) {
            let Source = {
                user: localStorage.getItem("userId"),
                name: sourceName
            };

            axios.post(`${value.url}/api/expencesource/`, Source, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }).then(() => {

                axios.get(`${value.url}/api/expencesource/`, {
                    headers: {
                        "Authorization": `Token ${localStorage.getItem("token")}`
                    }
                }).then((response) => {
                    setSource(response.data)
                })

            }).catch(() => {
            });


        } else alert("Formani to'ldiring")
    };

    const delSource = () => {
        axios.delete(`${value.url}/api/expencesource/${sourceId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then(() => {

            axios.get(`${value.url}/api/expencesource/`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }).then((response) => {
                setSource(response.data.items);
            });

            window.location.reload()

        }).catch(() => {
        });
    };


    return <div className="outgoing-container">
        <div className="container ForTitle">
            <Navbar/>
            <div className="title">Чиқим</div>
        </div>

        <div className={`edit-box ${checkBtn ? "edit-box-hide" : ""} `}>
            <div className="title">Таҳрирлаш</div>

            <div className="inputs">


                <div className="person">
                    <label htmlFor="source">Қаердан:</label>
                    <select onChange={getInputs} name="source" id="source">
                        <option></option>
                        {source.map((item, index) => {
                            return <option key={index} value={item.id}>{item.name}</option>
                        })}
                    </select>
                </div>

                <div className="person">
                    <label htmlFor="name">Нимадан:</label>
                    <div className="input">
                        <select onChange={getInputs} name="source_expence" id="source_expence">
                            <option></option>
                            <option value="Soft_Amount">Киримдан</option>
                            <option value="Fund">Жамғармадан</option>
                        </select>

                    </div>
                </div>

                <input id="amount" onChange={getInputs} name="amount"
                       placeholder="нарх" type="number"/>

                <input id="date" onChange={getInputs} name="date" type="date"/>


                <textarea cols="30" rows="10" onChange={getInputs} id="description" name="description"
                          placeholder="Қўшимча маълумот учун"></textarea>
            </div>

            <div className="btn-box">
                <div onClick={() => {
                    setCheckBtn(true);
                    let newList = {
                        name: "",
                        gift: "",
                        description: "",
                        fund: "",
                        date: "",
                        price: ""
                    };
                    setList(newList)
                }} className="btn">
                    Бекор қилиш
                </div>

                <div onClick={() => {
                    editList();
                }} className="btn">
                    Таҳрирлаш
                </div>
            </div>
        </div>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <div className="edit">Чиқим қўшиш</div>
            </Modal.Header>
            <Modal.Body>

                <div className="person">
                    <label htmlFor="name">Қаерга:</label>

                    <div className="input">
                        {
                            addName ? <input onChange={(e) => setSourceName(e.target.value)} name="nameNew"
                                             placeholder="Қаердан" type="text"/>
                                : <select onChange={getSource}
                                          name="source" id="source">
                                    <option></option>
                                    {source.map((item, index) => {
                                        return <option key={index} value={item.id}>{item.name}</option>
                                    })}
                                </select>
                        }

                        {
                            addName ? <img onClick={() => {
                                    setAddName(!addName);
                                    addSource();
                                }} src="./images/check.png" alt=""/>
                                : ""
                        }
                        {!addName ? <img onClick={() => setAddName(!addName)} src="./images/add.png" alt=""/> : ""}
                        {sourceId ? <img onClick={delSource} src="./images/delete.png" alt=""/> : ""}
                    </div>

                </div>

                <div className="person">
                    <label htmlFor="name">Нимадан:</label>
                    <div className="input">
                        <select onChange={getInputs} name="source_expence" id="source">
                            <option></option>
                            <option value="Soft_Amount">Киримдан</option>
                            <option value="Fund">Жамғармадан</option>
                        </select>

                    </div>
                </div>

                <input onChange={getInputs} name="amount" placeholder="Чиқим нархи" type="number"/>
                <input onChange={getInputs} name="date" type="date"/>

                <textarea onChange={getInputs} name="description" placeholder="Қўшимча маълумот учун"></textarea>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {
                    addList()
                }}>
                    Qo'shish
                </Button>
            </Modal.Footer>
        </Modal>

        <div className="content-box">

            <div className="section-one">
                <div className="left-side">
                    <input onChange={(e) => {
                        setGetMoth(e.target.value)
                    }} type="month"/>

                    <button>
                        <img onClick={filterList} src="./images/setup.png" alt=""/>
                    </button>
                </div>

                <div className="right-side">
                    Умумий чиқим: {allPrice}
                </div>
            </div>

            <div className="section-two">
                <div className="left-side">
                    <div className="inputs">
                        <input onChange={(e) => {
                            setSearchText(e.target.value);
                            let s = 0;
                            MainList.filter((item) => {
                                return e.target.value.toLowerCase() === ""
                                    ? setPriceSearch(0)
                                    : item.source.toLowerCase().includes(e.target.value.toLowerCase());
                            }).map((item) => {
                                s = s + Number(item.amount)
                            });
                            setPriceSearch(s);
                        }} id="search" placeholder="Излаш..."
                               type="text"/>
                        <button><img src="./images/search.png" alt=""/></button>
                    </div>

                    {priceSearch > 0 ? <div className="for-price">Jami qiymat: {priceSearch}</div> : ""}
                </div>

                <div className="right-side">
                    <img onClick={() => {
                        handleShow();
                    }} src="./images/add.png" alt=""/>
                </div>
            </div>

            <div className="table-content">
                <table>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Қаерга</th>
                        <th>Сана</th>
                        <th>Нимадан</th>
                        <th>Нарх</th>
                        <th>Маълумот</th>
                        <th>Таҳрирлаш</th>
                        <th>Ўчириш</th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        MainList.filter((item) => {
                            return getSearchText.toLowerCase() === ""
                                ? item
                                : item.source.toLowerCase().includes(getSearchText)
                        }).map((item, index) => {
                            return <tr key={index} className={item.name === "qarz" ? "active" : ""}>
                                <td>{index + 1}</td>
                                <td>{item.source}</td>
                                <td>{item.date}</td>
                                <td>{item.source_expence == "Soft_Amount" ? "Киримдан" : "Жамғармадан"}</td>
                                <td>{item.amount} сўм</td>
                                <td>{item.description}</td>

                                <td>
                                    <div className="box">
                                        <img onClick={() => {
                                            setEditId(item.id)
                                            editList2(index);
                                            setCheckBtn(false);
                                        }} src="./images/edit.png" alt=""/>
                                    </div>
                                </td>

                                <td>
                                    <div className="box">
                                        <img onClick={() => delList(item.id)} src="./images/delete.png" alt=""/>
                                    </div>
                                </td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
};
export default OutgoingMoney;