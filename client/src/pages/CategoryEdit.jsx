import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ApiContext, useApiFetch } from "../apiContext.jsx";
import { FormattedMessage, useIntl } from "react-intl";
import Validator from "../Validator.js";

export default function CategoryEdit() {
    const api = useContext(ApiContext);
    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        if (!api.currentUser?.admin) navigate(`/categories/${id}`);
    }, []);

    const [ioError, setIoError] = useState(null);
    useEffect(() => { if (ioError) throw ioError; }, [ioError]);

    const [inputs, setInputs] = useState({
        name: "",
        description: "",
    });
    const [errors, setErrors] = useState([]);

    const path = `/categories/${id}`;
    const category = useApiFetch(path, null, setIoError);
    useEffect(() => {
        if (!category) return;
        setInputs({
            name: category.name,
            description: category.description,
        });
    }, [category]);

    const onInputsChanged = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const intl = useIntl();
    const onSubmit = async (e) => {
        e.preventDefault();

        const validator = new Validator(intl, inputs);
        validator.notEmpty("name");
        validator.maxLength("name", 20);
        validator.notEmpty("description");
        validator.maxLength("description", 200);

        const errors = validator.getErrors();
        if (errors.length > 0) {
            setErrors(errors);
            return;
        }

        const [result, error] = await api.put(path, inputs);
        if (result) {
            navigate(`/categories/${id}`);
        } else {
            errors.push(error.format(intl));
            setErrors(errors);
        }
    };

    return (
        <>
            {category && (<>
                <div className="header-with-buttons">
                    <h2>
                        <FormattedMessage
                            id="page.categories.edit.title"
                            values={{ name: category.name }} />
                    </h2>
                    <div>
                        <button onClick={onSubmit}>
                            <FormattedMessage id="button.save" />
                        </button>
                        <Link to={`/categories/${category.id}`}>
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

                    <label htmlFor="id">ID:</label>
                    <input id="id" value={category.id} disabled />
                    <br />
                </form>

                <ul className="error">
                    {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            </>)}
        </>
    );
}
