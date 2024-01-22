import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { ApiContext, useApiFetch, usePagination } from "../apiContext.jsx";
import AddParticipantDialog from "../components/AddParticipantDialog.jsx";
import { FormattedMessage, useIntl } from "react-intl";
import Validator from "../Validator.js";

export default function TournamentEdit() {
    const api = useContext(ApiContext);
    const navigate = useNavigate();
    if (!api.currentUser) navigate("/");

    const { id } = useParams();

    const [ioError, setIoError] = useState(null);
    useEffect(() => { if (ioError) throw ioError; }, [ioError]);

    const path = `/tournaments/${id}`;
    
    const allParticipants = usePagination("/participants", 3, setIoError);
    const categories = useApiFetch("/categories", [], setIoError);

    const [inputs, setInputs] = useState({
        name: "",
        date: "",
        address: "",
        idCategory: 1,
        isClosed: false,
    });
    const [errors, setErrors] = useState([]);
    const [participants, setParticipants] = useState([]);

    const tournament = useApiFetch(path, null, setIoError);
    useEffect(() => {
        if (!tournament) return;
        setInputs({
            name: tournament.name,
            date: tournament.date,
            address: tournament.address,
            idCategory: tournament.category.id,
            isClosed: tournament.isClosed,
        });
        
        const canEdit = !tournament.isClosed && (
            api.currentUser.id === tournament.organizer.id ||
            api.currentUser.admin);
        if (!canEdit) navigate("/");
    }, [tournament]);

    const participantData = useApiFetch(path + "/participants", [], setIoError);
    useEffect(() => {
        if (!participantData) return;
        setParticipants(participantData);
    }, [participantData]);

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
        validator.maxLength("name", 50)
        validator.notEmpty("date");
        validator.notEmpty("address");
        validator.maxLength("address", 150);

        const errors = validator.getErrors();
        if (errors.length > 0) {
            setErrors(errors);
            return;
        }

        const [result, error] = await api.put(`/tournaments/${id}`, {
            ...inputs,
            participants: participants.map(x => ({
                id: x.id,
                result: x.result || undefined,
            })),
        });
        if (result) {
            navigate(`/tournaments/${id}`);
        } else {
            errors.push(error.format(intl));
            setErrors(errors);
        }
    }

    const isAdded = (participant) =>
    participants.findIndex(x => x.id == participant.id) >= 0;

    const addParticipant = (participant) => {
        setParticipants([...participants, {
            id: participant.id,
            firstName: participant.firstName,
            lastName: participant.lastName,
            result: null,
        }]);
    };

    const removeParticipant = (participant) => {
        setParticipants(participants.filter(x => x.id !== participant.id));
    };

    const [addingParticipants, setAddingParticipants] = useState(false);
    const closeConfirm = useRef();

    return (
        <>
            {tournament && (<>
                <AddParticipantDialog
                    pagination={allParticipants}
                    isAdded={isAdded}
                    onAdd={addParticipant}
                    open={addingParticipants}
                    onClose={() => setAddingParticipants(false)} />

                <dialog ref={closeConfirm}>
                    <h2><FormattedMessage
                            id="page.tournaments.edit.close-confirm"
                            values={{ name: tournament.name}} /></h2>
                    <p><FormattedMessage id="page.tournaments.edit.close-confirm" /></p>

                    <button onClick={() => closeConfirm.current.close()}>
                        <FormattedMessage id="button.close-tournament" />
                    </button>
                    <a href="#" onClick={() => closeConfirm.current.close()}>
                        <FormattedMessage id="button.cancel" />
                    </a>
                </dialog>

                <div className="header-with-buttons">
                    <h2>
                        <FormattedMessage
                            id="page.tournaments.edit.title"
                            values={{ name: tournament.name }} />
                    </h2>
                    <div>
                        <button onClick={onSubmit}>
                            <FormattedMessage id="button.save" />
                        </button>
                        <Link to={`/tournaments/${tournament.id}`}>
                            <FormattedMessage id="button.cancel" />
                        </Link>
                        <button className="destructive-btn" onClick={() => closeConfirm.current.showModal()}>
                            <FormattedMessage id="button.close-tournament" />
                        </button>
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

                    <label htmlFor="id">ID:</label>
                    <input id="id" value={tournament.id} disabled />
                    <br />
                </form>

                <ul className="error">
                    {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>

                <h3>Participants</h3>
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
            </>)}
        </>
    );
}
