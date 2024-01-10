import { Route, NavLink, Routes, BrowserRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
    return (
        <BrowserRouter>
            <header>
                <div className="header-wrapper">
                    <div>
                        <NavLink to="/">
                            <FormattedMessage id="nav.home" />
                        </NavLink>
                        <NavLink to="/about">
                            <FormattedMessage id="nav.about" />
                        </NavLink>
                    </div>
                    <div>
                        <span id="user-name">
                            Jan Nowak
                        </span>
                        <button id="logout-btn">
                            <FormattedMessage id="button.logout" />
                        </button>
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
