import React, {useMemo, createContext, useState} from "react";
import {Routes, Route} from "react-router-dom";
import Home from "../home/Home";
import IncomingMoney from "../incoming-money/IncomingMoney";
import Login from "../login/Login";
import ChangePassword from "../change-password/ChangePassword";
import Fund from "../fund/Fund";
import OutgoingMoney from "../outgoing-money/OutgoingMoney";
import Debt from "../debt/Debt";
import AllStatistics from "../allStatistics/AllStatistics";
import AddUser from "../add-user/AddUser";
import NotFound from "../notFound/NotFound";


export const MyContext = createContext();


const App = () => {

    const [url, setUrl] = useState('http://127.0.0.1:8000/');

    const userRoute=[
        {
            path:"/",
            element:<Home/>
        },
        {
            path:"/incoming-money",
            element:<IncomingMoney/>
        },
        {
            path:"/outgoing-money",
            element:<OutgoingMoney/>
        },
        {
            path:"/change-password",
            element:<ChangePassword/>
        },
        {
            path:"/fund",
            element:<Fund/>
        },
        {
            path:"/debt",
            element:<Debt/>
        },
        {
            path:"/statistics",
            element:<AllStatistics/>
        },
        {
            path:"/add-user",
            element:<AddUser/>
        },
    ];
    const loginRoute=[
        {
            path:"/",
            element:<Login/>
        },
    ];

    const role = useMemo(() => localStorage.getItem('userRole'), []);

    const routes = useMemo(() => {
        if (role === 'user' || role === 'superAdmin') return userRoute;

        return loginRoute
    }, [role]);


    return <>
        <MyContext.Provider value={{
            url
        }}>
            <Routes>
                {
                    routes.map((route, index) => (
                        <Route key={index} {...route} />
                    ))
                }
                <Route path={'*'} element={<NotFound/>}/>
            </Routes>
        </MyContext.Provider>
    </>
};

export default App;