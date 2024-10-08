import { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { Link, NavLink } from "react-router-dom";
import './Header.jsx.css';
import { ApiContext } from "../apiContext";
import { LanguageContext } from "../languageContext";

function Header() {
    const api = useContext(ApiContext);
    const language = useContext(LanguageContext);

    const logout = () => {
        api.logout();
        window.location.reload();
    };

    return (
        <header className="Header">
            <div className="header-wrapper">
                <nav>
                    <NavLink to="/categories">
                        <FormattedMessage id="page.categories.title" />
                    </NavLink>
                    <NavLink to="/tournaments">
                        <FormattedMessage id="page.tournaments.title" />
                    </NavLink>
                    <NavLink to="/participants">
                        <FormattedMessage id="page.participants.title" />
                    </NavLink>
                </nav>
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

                    <select value={language.language}
                            onChange={(e) => language.setLanguage(e.target.value)}>
                        {language.getLanguages().map(lang => (
                            <option key={lang}>{lang}</option>
                        ))}
                    </select>
                </div>
            </div>
        </header>
    );
}

export default Header;
