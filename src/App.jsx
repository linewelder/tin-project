import { Route, NavLink, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import About from "./About";

function App() {
    return (
        <BrowserRouter>
            <header>
                <div className="header-wrapper">
                    <div>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/about">About</NavLink>
                    </div>
                    <div>
                        <span id="user-name">Jan Nowak</span>
                        <button id="logout-btn">Logout</button>
                    </div>
                </div>
            </header>

            <div className="wrapper">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
