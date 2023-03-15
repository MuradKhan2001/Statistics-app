import "./navbar.scss"
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Dropdown} from "react-bootstrap";

const Navbar = () => {

    const [nav, setNav] = useState(false);
    const navigate = useNavigate();

    const menu = [
        {
            id: 1,
            name: "Бош саҳифа",
            link: "/"
        },
        {
            id: 2,
            name: "Кирим",
            link: "/incoming-money"
        },
        {
            id: 3,
            name: "Чиқим",
            link: "/outgoing-money"
        },
        {
            id: 4,
            name: "Жамғарма",
            link: "/fund"
        },
        {
            id: 6,
            name: "Статистика",
            link: "/statistics"
        }
    ];

    return <nav className="navbar-container">

        <div className={nav ? "nav-list" : "nav-list-hide"}>
            {
                menu.map((item) => {
                    return <div onClick={() => {
                        navigate(item.link)
                    }} key={item.id} className="nav-item">{item.name}</div>
                })
            }
        </div>

        <div className="user-profile">
            <Dropdown>
                <Dropdown.Toggle variant="none" id="dropdown-basic">
                    <img className="security-icon" src="./images/security.png" alt=""/>
                    <div className="Name">
                        {localStorage.getItem("userName")}
                    </div>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => {
                        navigate('/change-password')
                    }}>
                        Парол алмаштириш
                    </Dropdown.Item>

                    {
                        localStorage.getItem("userRole") === "superAdmin" ?
                            <Dropdown.Item onClick={() => {
                                navigate('/add-user')
                            }}>
                                Фойдаланувчи қўшиш
                            </Dropdown.Item> : ""
                    }

                    <Dropdown.Item onClick={() => {
                        window.location.pathname= "/";
                        localStorage.removeItem("userRole");
                        localStorage.removeItem("token");
                        localStorage.removeItem("userId");
                        localStorage.removeItem("userName");
                        window.location.pathname= "/";
                    }}>
                        Чиқиш
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>

        <div className="nav-show">
            {
                nav ? <img onClick={() => setNav(false)} src="./images/close.png" alt=""/> :
                    <img onClick={() => setNav(true)} src="./images/menu.png" alt=""/>
            }
        </div>
    </nav>
};

export default Navbar