import "./debt.scss";
import Navbar from "../navbar/Navbar";
import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Debt = () => {

    const [debtNav, setDebtNav] = useState(true);


    const [checkBtn, setCheckBtn] = useState(true);
    const [checkBtnTwo, setCheckBtnTwo] = useState(true);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [MainList, setMainList] = useState([]);
    const [MainListTwo, setMainListTwo] = useState([]);

    const [editIndex, setEditIndex] = useState(0);
    const [editIndexTwo, setEditIndexTwo] = useState(0);
    const [getMoth, setGetMoth] = useState();
    const [getMothTwo, setGetMothTwo] = useState();
    const [getSearchText, setSearchText] = useState("");
    const [getSearchTextTwo, setSearchTextTwo] = useState("");

    const [addName, setAddName]=useState(false);
    const [addNameTwo, setAddNameTwo]=useState(false);

    const list = {
        name: "",
        date: "",
        price: "",
        description: ""
    };

    const list_two = {
        name: "",
        date: "",
        price: "",
        description: ""
    };

    const getInputs = (e) => {
        list[e.target.name] = e.target.value;
    };
    const addList = () => {
        let NewArr = MainList.concat(list);
        setMainList(NewArr)
    };
    const editList = () => {

    };
    const delList = (index) => {

    };

    const getInputsTwo = (e) => {
        list_two[e.target.name] = e.target.value;
    };
    const addListTwo = () => {
        let NewArr = MainListTwo.concat(list);
        setMainListTwo(NewArr)
    };
    const editListTwo = () => {

    };
    const delListTwo = (index) => {

    };




    return <div className="debt-container">
        <div className="container">
            <Navbar/>
        </div>

        <div className="header">
            <div onClick={()=>setDebtNav(true)} className={`nav-debt ${debtNav ? "nav-active" : ""}`}>Қарз олиш</div>
            <div onClick={()=>setDebtNav(false)} className={`nav-debt ${!debtNav ? "nav-active" : ""}`}>Қарзни узиш</div>
        </div>

        {
            debtNav ?
                <div className="debt">
                    <div className={`edit-box ${checkBtn ? "edit-box-hide" : ""} `}>
                        <div className="title">Tahrirlash</div>

                        <div className="inputs">

                            <div className="person">
                                <label htmlFor="name">Qayerdan:</label>
                                <select onChange={getInputs} name="name" id="name">
                                    <option></option>
                                    <option value="ishxona">Ishxonadan</option>
                                    <option value="dokon">Do'kondan</option>
                                    <option value="restoran">Restorandan</option>
                                </select>
                            </div>

                            <input id="price" onChange={getInputs} name="price"
                                   placeholder="Qarz narxi" type="number"/>

                            <input id="date" onChange={getInputs} name="date" type="date"/>

                            <textarea id="description" onChange={getInputs} name="description"
                                      placeholder="Ma'lumot uchun"></textarea>
                        </div>

                        <div className="btn-box">
                            <div onClick={() => setCheckBtn(true)} className="btn">
                                Bekor qilish
                            </div>
                            <div onClick={() => {
                                setCheckBtn(true);
                                editList()
                            }} className="btn">
                                Tahrirlash
                            </div>
                        </div>
                    </div>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <div className="edit">Qarz</div>
                        </Modal.Header>
                        <Modal.Body>

                            <div className="person">
                                <label htmlFor="name">Pul qayerdan:</label>
                                <div className="input">
                                    {
                                        addName ?  <input  name="nameNew" placeholder={`Ma'lumot qo'shish`} type="text"/>
                                            : <select onChange={getInputs} name="name" id="name">
                                                <option></option>
                                                <option value="ishxona">Ishxonadan</option>
                                                <option value="dokon">Do'kondan</option>
                                                <option value="restoran">Restorandan</option>
                                            </select>
                                    }
                                    {
                                        addName ? <img onClick={()=>setAddName(!addName)} src="./images/check.png" alt=""/>
                                            : <img onClick={()=>setAddName(!addName)} src="./images/add.png" alt=""/>
                                    }
                                </div>
                            </div>

                            <input onChange={getInputs} name="price" placeholder="Nech pul qarz " type="number"/>

                            <input onChange={getInputs} name="date" type="date"/>

                            <textarea onChange={getInputs} name="description" placeholder="Ma'lumot uchun"></textarea>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => {
                                handleClose();
                                addList();
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
                                    <img src="./images/setup.png" alt=""/>
                                </button>
                            </div>

                            <div className="right-side">
                                Умумий қарз: 200 000
                            </div>
                        </div>

                        <div className="section-two">
                            <div className="left-side">
                                <input onChange={(e) => setSearchText(e.target.value)} id="search" placeholder="Izlash..."
                                       type="text"/>
                                <button><img src="./images/search.png" alt=""/></button>
                            </div>

                            <div className="right-side">
                                <img onClick={() => {
                                    handleShow();
                                    setCheckBtn("add")
                                }} src="./images/add.png" alt=""/>
                            </div>
                        </div>

                        <div className="table-content">
                            <table>
                                <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Kimdan</th>
                                    <th>Sana</th>
                                    <th>Narx</th>
                                    <th>Ma'lumot</th>
                                    <th>Tahrirlash</th>
                                    <th>O'chirish</th>
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    MainList.filter((item) => {
                                        return getSearchText.toLowerCase() === ""
                                            ? item
                                            : item.name.toLowerCase().includes(getSearchText)
                                    }).map((item, index) => {
                                        return <tr key={index} className={item.name === "qarz" ? "active" : ""}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.date}</td>
                                            <td>{item.price} so'm</td>
                                            <td>{item.description}</td>
                                            <td onClick={() => {

                                                setEditIndex(index);
                                                setCheckBtn(false);

                                                document.getElementById('name').value = item.name;
                                                document.getElementById('price').value = item.price;
                                                document.getElementById('date').value = item.date;
                                                document.getElementById('description').value = item.description;
                                            }}>
                                                <div className="box">
                                                    <img src="./images/edit.png" alt=""/>
                                                </div>
                                            </td>
                                            <td onClick={() => delList(index)}>
                                                <div className="box">
                                                    <img src="./images/delete.png" alt=""/>
                                                </div>
                                            </td>
                                        </tr>
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> :
                <div className="debt">
                    <div className={`edit-box ${checkBtnTwo ? "edit-box-hide" : ""} `}>
                        <div className="title">Tahrirlash</div>

                        <div className="inputs">

                            <div className="person">
                                <label htmlFor="name">Qayerdan:</label>
                                <select onChange={getInputsTwo} name="name" id="nameTwo">
                                    <option></option>
                                    <option value="ishxona">Ishxonadan</option>
                                    <option value="dokon">Do'kondan</option>
                                    <option value="restoran">Restorandan</option>
                                </select>
                            </div>

                            <input id="priceTwo" onChange={getInputsTwo} name="price"
                                   placeholder="Qarz narxi" type="number"/>

                            <input id="dateTwo" onChange={getInputsTwo} name="date" type="date"/>

                            <textarea id="descriptionTwo" onChange={getInputsTwo} name="description"
                                      placeholder="Ma'lumot uchun"></textarea>
                        </div>

                        <div className="btn-box">
                            <div onClick={() => setCheckBtn(true)} className="btn">
                                Bekor qilish
                            </div>
                            <div onClick={() => {
                                setCheckBtn(true);
                                editListTwo()
                            }} className="btn">
                                Tahrirlash
                            </div>
                        </div>
                    </div>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <div className="edit">Qarz</div>
                        </Modal.Header>
                        <Modal.Body>

                            <div className="person">
                                <label htmlFor="name">Qaysi qarz:</label>
                                <div className="input">
                                    {
                                        addNameTwo ?  <input  name="nameNew" placeholder={`Ma'lumot qo'shish`} type="text"/>
                                            : <select onChange={getInputs} name="name" id="name">
                                                <option></option>
                                                <option value="ishxona">Ishxonadan</option>
                                                <option value="dokon">Do'kondan</option>
                                                <option value="restoran">Restorandan</option>
                                            </select>
                                    }
                                    {
                                        addNameTwo ? <img onClick={()=>setAddNameTwo(!addNameTwo)} src="./images/check.png" alt=""/>
                                            : <img onClick={()=>setAddNameTwo(!addNameTwo)} src="./images/add.png" alt=""/>
                                    }
                                </div>

                                <label htmlFor="name">Qaysi puldan:</label>
                                <select onChange={getInputs} name="name" id="name">
                                    <option></option>
                                    <option value="ishxona">Kirimdan</option>
                                    <option value="dokon">Jamg'armadan</option>
                                </select>
                            </div>

                            <input onChange={getInputsTwo} name="price" placeholder="Nech pul qarz " type="number"/>

                            <input onChange={getInputsTwo} name="date" type="date"/>

                            <textarea onChange={getInputsTwo} name="description" placeholder="Ma'lumot uchun"></textarea>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => {
                                handleClose();
                                addListTwo();
                            }}>
                                Qo'shish
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <div className="content-box">
                        <div className="section-one">
                            <div className="left-side">
                                <input onChange={(e) => {
                                    setGetMothTwo(e.target.value)
                                }} type="month"/>

                                <button>
                                    <img src="./images/setup.png" alt=""/>
                                </button>
                            </div>
                        </div>

                        <div className="section-two">
                            <div className="left-side">
                                <input onChange={(e) => setSearchTextTwo(e.target.value)} id="search" placeholder="Izlash..."
                                       type="text"/>
                                <button><img src="./images/search.png" alt=""/></button>
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
                                    <th>Kimdan</th>
                                    <th>Sana</th>
                                    <th>Narx</th>
                                    <th>Ma'lumot</th>
                                    <th>Tahrirlash</th>
                                    <th>O'chirish</th>
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    MainListTwo.filter((item) => {
                                        return getSearchTextTwo.toLowerCase() === ""
                                            ? item
                                            : item.name.toLowerCase().includes(getSearchTextTwo)
                                    }).map((item, index) => {
                                        return <tr key={index} className={item.name === "qarz" ? "active" : ""}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.date}</td>
                                            <td>{item.price} so'm</td>
                                            <td>{item.description}</td>
                                            <td onClick={() => {

                                                setEditIndexTwo(index);
                                                setCheckBtnTwo(false);

                                                document.getElementById('nameTwo').value = item.name;
                                                document.getElementById('priceTwo').value = item.price;
                                                document.getElementById('dateTwo').value = item.date;
                                                document.getElementById('descriptionTwo').value = item.description;
                                            }}>
                                                <div className="box">
                                                    <img src="./images/edit.png" alt=""/>
                                                </div>
                                            </td>
                                            <td onClick={() => delListTwo(index)}>
                                                <div className="box">
                                                    <img src="./images/delete.png" alt=""/>
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
        }

    </div>
};

export default Debt