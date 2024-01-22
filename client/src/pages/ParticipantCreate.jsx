import { FormattedMessage, useIntl } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Validator from "../Validator";
import { ApiContext } from "../apiContext";

export default function ParticipantCreate() {
    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
    });
    const [errors, setErrors] = useState([]);

    const onInputsChanged = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const intl = useIntl();
    const api = useContext(ApiContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!api.currentUser?.admin) navigate("/participants");
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();

        const validator = new Validator(intl, inputs);
        validator.notEmpty("firstName");
        validator.maxLength("firstName", 30)
        validator.notEmpty("lastName");
        validator.maxLength("lastName", 30);

        const errors = validator.getErrors();
        if (errors.length > 0) {
            setErrors(errors);
            return;
        }

        const [result, error] = await api.post("/participants", inputs);
        if (result) {
            navigate("/participants");
        } else {
            errors.push(error.format(intl));
            setErrors(errors);
        }
    }

    return (
        <>
            <div className="header-with-buttons">
                <h2><FormattedMessage id="page.participants.create.title" /></h2>
                <div>
                    <button onClick={onSubmit}>
                        <FormattedMessage id="button.save" />
                    </button>
                    <Link to="/participants">
                        <FormattedMessage id="button.cancel" />
                    </Link>
                </div>
            </div>

            <form>
                <label htmlFor="firstName"><FormattedMessage id="label.first-name" /></label>
                <input type="text" id="firstName" name="firstName"
                    value={inputs.firstName} onChange={onInputsChanged}/>
                <br />

                <label htmlFor="lastName"><FormattedMessage id="label.last-name" /></label>
                <input type="text" id="lastName" name="lastName"
                    value={inputs.lastName} onChange={onInputsChanged}/>
                <br />
            </form>

            <ul className="error">
                {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
            </ul>
        </>
    );
}
