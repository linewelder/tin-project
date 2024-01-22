import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ApiContext, useApiFetch } from "../apiContext.jsx";
import { FormattedMessage, useIntl } from "react-intl";
import Validator from "../Validator.js";

export default function ParticipantEdit() {
    const api = useContext(ApiContext);
    const navigate = useNavigate();
    if (!api.currentUser?.admin) navigate("/participants");

    const { id } = useParams();

    const [ioError, setIoError] = useState(null);
    useEffect(() => { if (ioError) throw ioError; }, [ioError]);

    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
    });
    const [errors, setErrors] = useState([]);

    const path = `/participants/${id}`;
    const participant = useApiFetch(path, null, setIoError);
    useEffect(() => {
        if (!participant) return;
        setInputs({
            firstName: participant.firstName,
            lastName: participant.lastName,
        });
    }, [participant]);

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
        validator.notEmpty("firstName");
        validator.maxLength("firstName", 30);
        validator.notEmpty("lastName");
        validator.maxLength("lastName", 30);

        const errors = validator.getErrors();
        if (errors.length > 0) {
            setErrors(errors);
            return;
        }

        const [result, error] = await api.put(path, inputs);
        if (result) {
            navigate(`/participants/${id}`);
        } else {
            errors.push(error.format(intl));
            setErrors(errors);
        }
    };

    return (
        <>
            {participant && (<>
                <div className="header-with-buttons">
                    <h2>
                        <FormattedMessage
                            id="page.participants.edit.title"
                            values={{
                                firstName: participant.firstName,
                                lastName: participant.lastName
                            }} />
                    </h2>
                    <div>
                        <button onClick={onSubmit}>
                            <FormattedMessage id="button.save" />
                        </button>
                        <Link to={`/participants/${participant.id}`}>
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

                    <label htmlFor="id">ID:</label>
                    <input id="id" value={participant.id} disabled />
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
