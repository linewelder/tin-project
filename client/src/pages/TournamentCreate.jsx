import { FormattedMessage, useIntl } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import Validator from "../Validator";
import { ApiContext, useApiFetch, usePagination } from "../apiContext";
import AddParticipantDialog from "../components/AddParticipantDialog";

export default function TournamentCreate() {
    const [inputs, setInputs] = useState({
        name: "",
        date: "",
        address: "",
        idCategory: 1,
    });
    const [errors, setErrors] = useState([]);

    const [ioError, setIoError] = useState(null);
    useEffect(() => { if (ioError) throw ioError; }, [ioError]);
    const categories = useApiFetch("/categories", [], setIoError);
    const allParticipants = usePagination("/participants", 3, setIoError);
    const [participants, setParticipants] = useState([]);

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
        if (!api.currentUser) navigate("/tournaments");
    }, []);

    const isAdded = (participant) =>
        participants.findIndex(x => x.id == participant.id) >= 0;

    const addParticipant = (participant) => {
        setParticipants([...participants, participant]);
    };

    const removeParticipant = (participant) => {
        setParticipants(participants.filter(x => x.id !== participant.id));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const validator = new Validator(intl, inputs);
        validator.notEmpty("name");
        validator.maxLength("name", 50)
        validator.notEmpty("date");
        validator.notEmpty("address");
        validator.maxLength("address", 150);

        const errors = validator.getErrors();
        if (errors.length > 0) {
            setErrors(errors);
            return;
        }

        const [result, error] = await api.post("/tournaments", {
            ...inputs,
            participants: participants.map(x => x.id),
        });
        if (result) {
            navigate("/tournament");
        } else {
            errors.push(error.format(intl));
            setErrors(errors);
        }
    }

    const [addingParticipants, setAddingParticipants] = useState(false);

    return (
        <>
            <AddParticipantDialog
                pagination={allParticipants}
                onAdd={addParticipant}
                isAdded={isAdded}
                open={addingParticipants}
                onClose={() => setAddingParticipants(false)} />

            <div className="header-with-buttons">
                <h2><FormattedMessage id="page.tournaments.create.title" /></h2>
                <div>
                    <button onClick={onSubmit}>
                        <FormattedMessage id="button.save" />
                    </button>
                    <Link to="/tournaments">
                        <FormattedMessage id="button.cancel" />
                    </Link>
                </div>
            </div>

            <form>
                <label htmlFor="name"><FormattedMessage id="label.name" /></label>
                <input type="text" id="name" name="name"
                    value={inputs.name} onChange={onInputsChanged}/>
                <br />

                <label htmlFor="date"><FormattedMessage id="label.date" /></label>
                <input type="date" id="date" name="date"
                    value={inputs.date} onChange={onInputsChanged}/>
                <br />

                <label htmlFor="address"><FormattedMessage id="label.address" /></label>
                <input type="text" id="address" name="address"
                    value={inputs.address} onChange={onInputsChanged}/>
                <br />

                <label htmlFor="category"><FormattedMessage id="label.category" /></label>
                <select id="category" name="idCategory"
                    value={inputs.idCategory} onChange={onInputsChanged}
                >
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <br />
            </form>

            <ul className="error">
                {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
            </ul>

            <h3><FormattedMessage id="page.tournaments.details.participants" /></h3>

            <button onClick={() => setAddingParticipants(true)}>
                <FormattedMessage id="page.tournaments.create.add-participant" />
            </button>

            {participants.length > 0 &&
                <table>
                    <thead>
                        <tr>
                            <th><FormattedMessage id="table.participant.id" /></th>
                            <th><FormattedMessage id="table.participant.first-name" /></th>
                            <th><FormattedMessage id="table.participant.last-name" /></th>
                            <th><FormattedMessage id="table.actions" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {participants.map(participant => (
                            <tr key={participant.id}>
                                <td>{participant.id}</td>
                                <td>{participant.firstName}</td>
                                <td>{participant.lastName}</td>
                                <td>
                                    <button onClick={() => removeParticipant(participant)}>
                                        <FormattedMessage id="button.delete" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </>
    );
}
