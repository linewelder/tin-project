import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import api from "../api.js";
import Validator from "../Validator.js";

function Login() {
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();
    const intl = useIntl();

    const onInputsChanged = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const validator = new Validator(intl, inputs);
        validator.notEmpty("email");
        validator.notEmpty("password");

        const errors = validator.getErrors();
        if (errors.length > 0) {
            setErrors(errors);
            return;
        }

        const [result, error] = await api.post("/auth/login", inputs);
        if (result) {
            navigate("/");
        } else {
            errors.push(error.format(intl));
            setErrors(errors);
        }
    };

    return (
        <>
            <h2><FormattedMessage id="page.login.title" /></h2>

            <form>
                <label htmlFor="email">
                    <FormattedMessage id="label.email" />
                </label>
                <input id="email" type="text" name="email"
                    value={inputs.email} onChange={onInputsChanged} />

                <label htmlFor="password">
                    <FormattedMessage id="label.password" />
                </label>
                <input id="password" type="password" name="password"
                    value={inputs.password} onChange={onInputsChanged} />

                <button onClick={onSubmit}><FormattedMessage id="button.login" /></button>
            </form>

            <ul className="error">
                {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
            </ul>

            <p className="right-aligned">
                <Link to="/signup"><FormattedMessage id="page.signup.title" /></Link>
            </p>
        </>
    );
}

export default Login;
