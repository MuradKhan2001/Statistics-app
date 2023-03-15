import React, {useContext, useState, useEffect} from "react";
import Navbar from "../navbar/Navbar";
import "./add-user.scss"
import axios from "axios";
import {MyContext} from "../app/App";


const AddUser = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [checkUser, setCheckUser] = useState("");
    const [users, setUsers] = useState([]);

    let value = useContext(MyContext);

    function register() {
        if (username.trim().length > 0 && password.trim().length > 0 && password2.trim().length > 0) {
            let user = {
                username,
                password,
                password2
            };

            axios.post(`${value.url}/auth/register/`, user, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }).then(() => {

                axios.get(`${value.url}/api/user/`, {
                    headers: {
                        "Authorization": `Token ${localStorage.getItem("token")}`
                    }
                }).then((response) => {
                    setUsers(response.data);
                });

                setUserName("");
                setPassword2("");
                setPassword("")

            }).catch((error) => {
                if (error.response.status === 400) {
                    if (error.response.data.user.username[0] === "A user with that username already exists.") setCheckUser("Parollar mos kelmadi");
                }
            });
        } else setCheckUser("Formani to'diring")
    }


    useEffect(() => {
        axios.get(`${value.url}/api/user/`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            setUsers(response.data);
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

    function delUser(id) {
        axios.delete(`${value.url}/api/user/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            axios.get(`${value.url}/api/user/`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }).then((response) => {
                setUsers(response.data);
            })
        })

    }

    return <div className="add-user">
        <div className="container ForTitle">
            <Navbar/>
            <div className="title">Фойдаланувчи қўшиш</div>
        </div>

        <div className="content-box">
            <div className="sides">
                <div className="checkUser">
                    {checkUser}
                </div>
                <div className="inputs">
                    <input value={username} onChange={(e) => {
                        setUserName(e.target.value);
                        setCheckUser("")
                    }} placeholder="Логин"
                           type="text"/>
                    <input value={password} onChange={(e) => {
                        setPassword(e.target.value);
                        setCheckUser("")
                    }} placeholder="парол"
                           type="text"/>
                    <input value={password2} onChange={(e) => {
                        setPassword2(e.target.value);
                        setCheckUser("");
                    }}
                           placeholder="паролни такрорланг" type="text"/>
                </div>
                <div onClick={register} className="add-user-btn">Qo'shish</div>
            </div>
            <div className="sides">
                {
                    users.map((item, index) => {
                        return <div className="user" key={index}>
                            <div className="text">
                                <div>Логин: {item.username}</div>
                            </div>
                            <div className="buttons">
                                <div className="del">
                                    <img onClick={() => delUser(item.id)} src="./images/delete.png" alt=""/>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>


    </div>
};

export default AddUser