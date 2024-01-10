import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

function Signup() {
    return (
        <>
            <h2><FormattedMessage id="page.signup.title" /></h2>

            <form>
                <label for="email">
                    <FormattedMessage id="label.email" />
                </label>
                <input id="email" type="text" />

                <label for="first-name">
                    <FormattedMessage id="label.first-name" />
                </label>
                <input id="first-name" type="text" />

                <label for="last-name">
                    <FormattedMessage id="label.last-name" />
                </label>
                <input id="last-name" type="text" />

                <label for="password">
                    <FormattedMessage id="label.password" />
                </label>
                <input id="password" type="password" />

                <label for="password-again">
                    <FormattedMessage id="label.password-again" />
                </label>
                <input id="password-again" type="password" />

                <button><FormattedMessage id="button.signup" /></button>
            </form>

            <p className="right-aligned">
                <Link to="/login"><FormattedMessage id="page.login.title" /></Link>
            </p>
        </>
    );
}

export default Signup;
