import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import api from "../api.js";
import Validator from "../Validator.js";

function Signup() {
    const [inputs, setInputs] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        passwordAgain: ""
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
        validator.notEmpty("firstName");
        validator.notEmpty("lastName");
        validator.notEmpty("password");
        validator.validate("passwordAgain",
            x => x === inputs.password,
            "error.password.doesnt-match");

        const errors = validator.getErrors();
        if (errors.length > 0) {
            setErrors(errors);
            return;
        }

        const [result, error] = await api.post("/auth/register", inputs);
        if (result) {
            navigate("/");
        } else {
            errors.push(error.format(intl));
            setErrors(errors);
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

            <ul className="error">
                {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
            </ul>

            <p className="right-aligned">
                <Link to="/login"><FormattedMessage id="page.login.title" /></Link>
            </p>
        </>
    );
}

export default Signup;
