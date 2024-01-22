import { FormattedMessage } from "react-intl";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { ApiContext, useApiFetch } from "../apiContext.jsx";

export default function ParticipantDetails() {
    const { id } = useParams();

    const [error, setError] = useState(null);
    useEffect(() => { if (error) throw error; }, [error]);

    const api = useContext(ApiContext);
    const canEdit = api.currentUser?.admin || false;

    const path = `/participants/${id}`;
    const participant = useApiFetch(path, null, setError);

    const deleteConfirm = useRef(null);

    const navigate = useNavigate();
    const deleteParticipant = async () => {
        const [_, error] = await api.delete(path);
        if (error) setError(error);
        else navigate("/participants");
    };

    return (
        <>
            {participant && (<>
                <dialog ref={deleteConfirm}>
                    <h2>
                        <FormattedMessage
                            id="page.participants.details.delete-confirm"
                            values={{ firstName: participant.firstName, lastName: participant.lastName }} />
                    </h2>

                    <button className="destructive-btn" onClick={deleteParticipant}>
                        <FormattedMessage id="button.delete" />
                    </button>
                    <a href="#" onClick={() => deleteConfirm.current.close()}>
                        <FormattedMessage id="button.cancel" />
                    </a>
                </dialog>

                <div className="header-with-buttons">
                    <h2>{participant.firstName} {participant.lastName}</h2>
                    {canEdit && <div>
                        <Link to="edit" className="button-link">
                            <FormattedMessage id="button.edit" />
                        </Link>
                        <button onClick={() => deleteConfirm.current.showModal()} className="destructive-btn">
                            <FormattedMessage id="button.delete" />
                        </button>
                    </div>}
                </div>
                
                <dl>
                    <dt><FormattedMessage id="label.first-name" /></dt>
                    <dd>{participant.firstName}</dd>
                    <dt><FormattedMessage id="label.last-name" /></dt>
                    <dd>{participant.lastName}</dd>
                    <dt><FormattedMessage id="label.id" /></dt>
                    <dd>{participant.id}</dd>
                </dl>

                <h3><FormattedMessage id="page.participants.details.records" /></h3>
                <table>
                    <thead>
                        <tr>
                            <th><FormattedMessage id="table.result.category" /></th>
                            <th><FormattedMessage id="table.result.result" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {participant.records.map(record => (
                            <tr key={record.idCategory}>
                                <td>{record.category}</td>
                                <td>{record.result}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>)}
        </>
    );
}
