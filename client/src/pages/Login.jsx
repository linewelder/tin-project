import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

function Login() {
    return (
        <>
            <h2><FormattedMessage id="page.login.title" /></h2>

            <form>
                <label htmlFor="email">
                    <FormattedMessage id="label.email" />
                </label>
                <input id="email" type="text" />

                <label htmlFor="password">
                    <FormattedMessage id="label.password" />
                </label>
                <input id="password" type="password" />

                <button><FormattedMessage id="button.login" /></button>
            </form>

            <p className="right-aligned">
                <Link to="/signup"><FormattedMessage id="page.signup.title" /></Link>
            </p>
        </>
    );
}

export default Login;
