import React, {useContext, useEffect, useState} from "react";
import "./incoming.scss"
import Navbar from "../navbar/Navbar";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {MyContext} from "../app/App";
import axios from "axios";

const IncomingMoney = () => {

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
            name: "",
            date: "",
            price: "",
            fund: 0,
            gift: false,
            description: "Йўқ"
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

        axios.get(`${value.url}/api/income/`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            setMainList(response.data.items);
            setAllPrice(response.data.income.income);
        }).catch((error) => {
            if (error.response.statusText == "Unauthorized") {
                window.location.pathname = "/";
                localStorage.removeItem("userRole");
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                localStorage.removeItem("userName");
            }
        });

        axios.get(`${value.url}/api/source/`, {
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
        if (list.name > 0 && list.price.trim().length > 0 && list.date) {
            let lists = {
                user: localStorage.getItem("userId"),
                source: list.name,
                amount: list.price,
                fund_percent: list.fund,
                gift: list.gift,
                description: list.description,
                date: list.date
            };

            axios.post(`${value.url}/api/income/`, lists, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }).then(() => {

                axios.get(`${value.url}/api/income/`,{
                    headers: {
                        "Authorization": `Token ${localStorage.getItem("token")}`
                    }
                }).then((response) => {
                    setMainList(response.data.items);
                });

                let newList = {
                    name: "",
                    date: "",
                    price: "",
                    fund: 0,
                    gift: false,
                    description: "Йўқ"
                };
                setList(newList);
                handleClose();
            }).catch(() => {

            });


        } else alert("Formani to'ldiring")
    };

    const delList = (id) => {
        axios.delete(`${value.url}/api/income/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then(() => {
            axios.get(`${value.url}/api/income/`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }).then((response) => {
                setMainList(response.data.items);
            })
        }).catch(() => {
        });
    };

    const editList = () => {
        let lists = {
            user: localStorage.getItem("userId"),
            source: list.name,
            amount: list.price,
            fund_percent: list.fund,
            gift: list.gift,
            description: list.description,
            date: list.date
        };

        axios.put(`${value.url}/api/income/${editId}/`, lists, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then(() => {
            axios.get(`${value.url}/api/income/`,{
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }).then((response) => {
                setMainList(response.data.items);
            });
            setCheckBtn(true);
            let newList = {
                name: "",
                date: "",
                price: "",
                fund: 0,
                gift: false,
                description: "Йўқ"
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
            name: sourceId,
            price: MainList[index].amount,
            gift: MainList[index].gift,
            description: MainList[index].description,
            fund: MainList[index].fund_percent,
            date: MainList[index].date
        };
        setList(newList)

        document.getElementById('name').value = sourceId;
        document.getElementById('price').value = MainList[index].amount;
        document.getElementById('description').value = MainList[index].description;
        document.getElementById('fund').value = MainList[index].fund_percent;
        document.getElementById('date').value = MainList[index].date;
    };

    const filterList = () => {
        if (getMoth) {
            let year = getMoth.slice(0, 4);
            let month = getMoth.slice(5, 7);

            axios.get(`${value.url}/api/income/`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                },
                params: {year: year, month: month}
            }).then((response) => {
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

            axios.post(`${value.url}/api/source/`, Source, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }).then(() => {

                axios.get(`${value.url}/api/source/`, {
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

    const delSource = () =>{
        axios.delete(`${value.url}/api/source/${sourceId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then(() => {

            axios.get(`${value.url}/api/source/`, {
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

    return <div className="incoming-container">
        <div className="container ForTitle">
            <Navbar/>
            <div className="title">Кирим</div>
        </div>

        <div className={`edit-box ${checkBtn ? "edit-box-hide" : ""} `}>
            <div className="title">Таҳрирлаш</div>

            <div className="inputs">

                <div className="person">
                    <label htmlFor="name">Қаердан:</label>
                    <select onChange={getInputs} name="name" id="name">
                        <option></option>
                        {source.map((item, index) => {
                            return <option key={index} value={item.id}>{item.name}</option>
                        })}
                    </select>
                </div>

                <input id="price" onChange={getInputs} name="price"
                       placeholder="нарх" type="number"/>

                <input id="date" onChange={getInputs} name="date" type="date"/>

                <input id="fund" onChange={getInputs} name="fund"
                       placeholder="Жамғарма учун %" type="number"/>

                <div className="gift">
                    <label htmlFor="">Совға: </label>

                    <span className="me-2">Бор</span> <input onChange={getInputs}
                                                             type="radio" id="giftTrue" name="gift"
                                                             value="true" className="me-2"/>
                    <span className="me-2">Йўқ</span> <input onChange={getInputs}
                                                             type="radio" id="giftFalse"
                                                             name="gift" value="false"/>
                </div>

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
                <div className="edit">Кирим қўшиш</div>
            </Modal.Header>
            <Modal.Body>

                <div className="person">
                    <label htmlFor="name">Қаердан:</label>
                    <div className="input">
                        {
                            addName ? <input onChange={(e) => setSourceName(e.target.value)} name="nameNew"
                                             placeholder="Қаердан" type="text"/>
                                : <select onChange={getSource} name="name" id="name">
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
                        {sourceId ?  <img onClick={delSource} src="./images/delete.png" alt=""/> : ""}
                    </div>
                </div>

                <input onChange={getInputs} name="price" placeholder="Кирим нархи" type="number"/>
                <input onChange={getInputs} name="date" type="date"/>

                <input onChange={getInputs} name="fund" placeholder="Жамғарма учун %" type="number"/>
                <div className="gift">
                    <label htmlFor="">Совға: </label>

                    <span className="me-2">Бор</span> <input onChange={getInputs} type="radio" id="giftTrue" name="gift"
                                                             value="true" className="me-2"/>
                    <span className="me-2">Йўқ</span> <input onChange={getInputs} type="radio" id="giftFalse"
                                                             name="gift" value="false"/>
                </div>

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
                    Умумий кирим: {allPrice}
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
                        <th>Кимдан</th>
                        <th>Сана</th>
                        <th>Нарх</th>
                        <th>Неча фойиз жамғармага</th>
                        <th>Неч пул жамғармага</th>
                        <th>Қолган пул</th>
                        <th>Совға</th>
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
                                : item.source.toLowerCase().includes(getSearchText);
                        }).map((item, index) => {
                            return <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.source}</td>
                                <td>{item.date}</td>
                                <td>{item.amount} so'm</td>
                                <td>{item.fund_percent}%</td>
                                <td>{item.fund} so'm</td>
                                <td>{item.clean_amount} so'm</td>
                                <td>{item.gift ? "Бор" : "Йўқ"}</td>
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
export default IncomingMoney;