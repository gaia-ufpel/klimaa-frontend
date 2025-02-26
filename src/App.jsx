import './App.css'

import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import ServerError from "./pages/ServerError.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="login" element={<Login/>} />
                    <Route path="register" element={<Register/>} />
                    <Route path="/" element={<Home/>} />
                    <Route path="/server-error" element={<ServerError/>} />
                    <Route path="*" element={<NotFound/>} />
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
}

export default App
