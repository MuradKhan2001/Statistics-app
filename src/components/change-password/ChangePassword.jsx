import {useState, useContext} from "react";
import "./change-password.scss"
import axios from "axios";
import {MyContext} from "../app/App";


const ChangePassword =()=>{

    let value = useContext(MyContext);

    const [oldPassword, setOldPassword] = useState("");
    const [NewPassword, setNewPassword] = useState("");
    const [ConfirmNewPassword, setConfirmNewPassword] = useState("");
    const [error, setError] = useState("");


    function changePassword() {
        if (oldPassword.trim().length > 0 && NewPassword.trim().length > 0 && ConfirmNewPassword.trim().length > 0) {

            if (NewPassword === ConfirmNewPassword) {
                let password = {
                    old_password: oldPassword,
                    new_password: NewPassword
                };

                axios.put(`${value.url}/auth/security/${localStorage.getItem("userId")}/`, password, {
                    headers: {
                        "Authorization": `Token ${localStorage.getItem("token")}`
                    }
                }).then((response) => {
                    alert("Parol muvaffaqiyatli o'zgartirildi");
                    window.location.pathname= "/";
                    localStorage.removeItem("userRole");
                    localStorage.removeItem("token");
                    localStorage.removeItem("userId");
                    localStorage.removeItem("userName");

                }).catch((error) => {
                    if (error.response.statusText == "Unauthorized") {
                        window.location.pathname= "/";
                        localStorage.removeItem("userRole");
                        localStorage.removeItem("token");
                        localStorage.removeItem("userId");
                        localStorage.removeItem("userName");
                    }
                    if (error.response.status === 400) setError("Ески парол тўғри келмади");
                });
            } else setError("Пароллар мос келмади")

        } else setError("Формани тўлдиринг")
    }

    return <div className="login-wrapper">
        <div className="sloy">
            <div className="login-box">
                <div className="title">
                    Парол алмаштириш
                </div>
                <div className="error">
                    {error}
                </div>
                <div className="inputs">
                    <input value={oldPassword} onChange={(e)=>{
                        setOldPassword(e.target.value);
                        setError("")
                    }} placeholder="Ески парол" type="text"/>
                    <input value={NewPassword} onChange={(e)=>{
                        setNewPassword(e.target.value);
                        setError("")
                    }} placeholder="Янги парол" type="password"/>

                    <input value={ConfirmNewPassword} onChange={(e)=>{
                        setConfirmNewPassword(e.target.value);
                        setError("")
                    }} placeholder="Янги паролни такрорланг" type="password"/>
                </div>

                <button onClick={changePassword} className="login-btn">Aлмаштириш</button>
            </div>
        </div>
    </div>
};

export default ChangePassword