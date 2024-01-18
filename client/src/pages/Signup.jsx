import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
    const [inputs, setInputs] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        passwordAgain: ""
    });

    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const onInputsChanged = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8800/api/auth/register", inputs);
            navigate("/");
        } catch (error) {
            setError(error);
        }
    }

    return (
        <>
            <h2><FormattedMessage id="page.signup.title" /></h2>

            <form>
                <label htmlFor="email">
                    <FormattedMessage id="label.email" />
                </label>
                <input id="email" type="email" name="email"
                    value={inputs.email} onChange={onInputsChanged} />

                <label htmlFor="firstName">
                    <FormattedMessage id="label.first-name" />
                </label>
                <input id="firstName" type="text" name="firstName"
                    value={inputs.firstName} onChange={onInputsChanged} />

                <label htmlFor="lastName">
                    <FormattedMessage id="label.last-name" />
                </label>
                <input id="lastName" type="text" name="lastName"
                    value={inputs.lastName} onChange={onInputsChanged} />

                <label htmlFor="password">
                    <FormattedMessage id="label.password" />
                </label>
                <input id="password" type="password" name="password"
                    value={inputs.password} onChange={onInputsChanged} />

                <label htmlFor="passwordAgain">
                    <FormattedMessage id="label.password-again" />
                </label>
                <input id="passwordAgain" type="password" name="passwordAgain"
                    value={inputs.passwordAgain} onChange={onInputsChanged} />

                <button onClick={onSubmit}><FormattedMessage id="button.signup" /></button>
            </form>

            {error && <p className="error">{error + ""}</p>}

            <p className="right-aligned">
                <Link to="/login"><FormattedMessage id="page.login.title" /></Link>
            </p>
        </>
    );
}

export default Signup;
