import { FormattedMessage, useIntl } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Validator from "../Validator";
import { ApiContext } from "../apiContext";

export default function CategoryCreate() {
    const [inputs, setInputs] = useState({
        name: "",
        description: "",
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
        if (!api.currentUser?.admin) navigate("/categories");
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();

        const validator = new Validator(intl, inputs);
        validator.notEmpty("name");
        validator.maxLength("name", 20)
        validator.notEmpty("description");
        validator.maxLength("description", 200);

        const errors = validator.getErrors();
        if (errors.length > 0) {
            setErrors(errors);
            return;
        }

        const [result, error] = await api.post("/categories", inputs);
        if (result) {
            navigate("/categories");
        } else {
            errors.push(error.format(intl));
            setErrors(errors);
        }
    }

    return (
        <>
            <div className="header-with-buttons">
                <h2><FormattedMessage id="page.categories.create.title" /></h2>
                <div>
                    <button onClick={onSubmit}>
                        <FormattedMessage id="button.save" />
                    </button>
                    <Link to="/categories">
                        <FormattedMessage id="button.cancel" />
                    </Link>
                </div>
            </div>

            <form>
                <label htmlFor="name"><FormattedMessage id="label.name" /></label>
                <input type="text" id="name" name="name"
                    value={inputs.name} onChange={onInputsChanged}/>
                <br />

                <label htmlFor="description"><FormattedMessage id="label.description" /></label>
                <input type="text" id="description" name="description"
                    value={inputs.description} onChange={onInputsChanged}/>
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
