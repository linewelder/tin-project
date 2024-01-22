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
                    <NavLink to="/categories">
                        <FormattedMessage id="page.categories.title" />
                    </NavLink>
                    <NavLink to="/tournaments">
                        <FormattedMessage id="page.tournaments.title" />
                    </NavLink>
                    <NavLink to="/participants">
                        <FormattedMessage id="page.participants.title" />
                    </NavLink>
                </div>
                <div>
                    {api.currentUser ? (
                        <>
                            <span id="user-name">
                                {api.currentUser.firstName} {api.currentUser.lastName}
                                {api.currentUser.admin &&
                                    <span> <FormattedMessage id="label.admin" /></span>}
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
