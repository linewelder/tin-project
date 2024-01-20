import { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { Link, NavLink } from "react-router-dom";
import './Header.jsx.css';
import { ApiContext } from "../apiContext";

function Header() {
    const api = useContext(ApiContext);

    const logout = () => {
        api.logout();
        window.location.reload();
    };

    return (
        <header className="Header">
            <div className="header-wrapper">
                <div>
                    <NavLink to="/">
                        <FormattedMessage id="nav.home" />
                    </NavLink>
                    <NavLink to="/about">
                        <FormattedMessage id="nav.about" />
                    </NavLink>
                    <NavLink to="/categories">
                        <FormattedMessage id="page.categories.title" />
                    </NavLink>
                </div>
                <div>
                    {api.currentUser ? (
                        <>
                            <span id="user-name">
                                {api.currentUser.firstName} {api.currentUser.lastName}
                            </span>
                            <button id="logout-btn" onClick={logout}>
                                <FormattedMessage id="button.logout" />
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="button-link">
                            <FormattedMessage id="button.login" />
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
