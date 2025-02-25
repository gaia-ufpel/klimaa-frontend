import './App.css'

import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="login" element={<Login/>} />
                    <Route path="register" element={<Register/>} />
                    <Route path="/" exact element={<Home/>} />
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
}

export default App
