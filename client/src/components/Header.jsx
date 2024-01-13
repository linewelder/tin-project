import { FormattedMessage } from "react-intl";
import { NavLink } from "react-router-dom";
import './Header.jsx.css';

function Header() {
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
                    <span id="user-name">
                        Jan Nowak
                    </span>
                    <button id="logout-btn">
                        <FormattedMessage id="button.logout" />
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
