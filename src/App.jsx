import './App.css'

import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                {/*<Navbar></Navbar>*/}
                <Routes>
                    {/*<Route path="/" element={<Home />} />*/}
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    {/*<Route path="/profile" element={<Profile />} />*/}
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App
