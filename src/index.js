import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.scss";
import Loader from "./components/loader/Loader";

const App = React.lazy(() => import('./components/app/App'));


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <React.Suspense fallback={<Loader/>}>
            <Router>
                <App/>
            </Router>
        </React.Suspense>
    </React.StrictMode>
);
