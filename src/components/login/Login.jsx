import "./login.scss"
import axios from "axios";
import {useState, useContext} from "react";
import {MyContext} from "../app/App";


const Login = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [checkUser,setCheckUser]=useState("");
    let value = useContext(MyContext);

    function logIn(){
        if (username.trim().length >0 && password.trim().length>0){
            let user={
                username,
                password
            };

            axios.post(`${value.url}/auth/login/`, user).then((response)=>{
                localStorage.setItem("token", response.data.token);
                let role='';
                if (response.data.is_staff)
                {
                    role='superAdmin';
                    localStorage.setItem('userRole', role);
                    window.location.pathname = '/';
                    localStorage.setItem("userName",response.data.username);
                    localStorage.setItem("userId",response.data.user);
                } else {
                    role='user';
                    localStorage.setItem('userRole', role);
                    window.location.pathname = '/';
                    localStorage.setItem("userName",response.data.username);
                    localStorage.setItem("userId",response.data.user);
                }
            }).catch((error)=>{
                if (error.response.status === 404) setCheckUser("Bu foydalanuvchi topilmadi");
            });
        } else setCheckUser("Formani to'diring")
    }



    return <div className="login-wrapper">
        <div className="sloy">
            <div className="login-box">
                <div className="title">
                    Кириш
                </div>
                <div className="error">
                    {checkUser}
                </div>
                <div className="inputs">
                    <input value={username} onChange={(e)=>{
                        setUserName(e.target.value)
                        setCheckUser("")
                    }} placeholder="Логин" type="text"/>
                    <input value={password} onChange={(e)=>{
                        setPassword(e.target.value)
                        setCheckUser("")
                    }} placeholder="Парол" type="password"/>
                </div>
                <button onClick={logIn} className="login-btn">Кириш</button>
            </div>
        </div>
    </div>
};

export default Login