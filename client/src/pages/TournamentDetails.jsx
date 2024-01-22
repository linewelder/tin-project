import { FormattedDate, FormattedMessage } from "react-intl";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { ApiContext, useApiFetch } from "../apiContext.jsx";

export default function TournamentDetails() {
    const { id } = useParams();

    const [error, setError] = useState(null);
    useEffect(() => { if (error) throw error; }, [error]);

    const path = `/tournaments/${id}`;
    const tournament = useApiFetch(path, null, setError);
    const participants = useApiFetch(path + "/participants", [], setError);

    const api = useContext(ApiContext);
    const canEdit = api.currentUser !== null && (
        api.currentUser.id === tournament?.organizer.id ||
        api.currentUser.admin);

    const deleteConfirm = useRef(null);

    return (
        <>
            {tournament && (<>
                <dialog ref={deleteConfirm}>
                    <h2>
                        <FormattedMessage
                            id="page.tournaments.details.delete-confirm"
                            values={{ name: tournament.name }} />
                    </h2>

                    <button className="destructive-btn" onClick={() => deleteConfirm.current.close()}>
                        <FormattedMessage id="button.delete" />
                    </button>
                    <a href="#" onClick={() => deleteConfirm.current.close()}>
                        <FormattedMessage id="button.cancel" />
                    </a>
                </dialog>

                <div className="header-with-buttons">
                    <h2>{tournament.name}</h2>
                    {canEdit && <div>
                        {!tournament.isClosed ? (
                            <Link to="edit" className="button-link">
                                <FormattedMessage id="button.edit" />
                            </Link>
                        ) : (
                            <span><FormattedMessage id="label.closed" /></span>
                        )}
                        <button onClick={() => deleteConfirm.current.showModal()}>
                            <FormattedMessage id="button.delete" />
                        </button>
                    </div>}
                </div>
                
                <dl>
                    <dt><FormattedMessage id="label.date" /></dt>
                    <dd><FormattedDate value={tournament.date} /></dd>
                    <dt><FormattedMessage id="label.address" /></dt>
                    <dd>{tournament.address}</dd>
                    <dt><FormattedMessage id="label.category" /></dt>
                    <dd>{tournament.category.name}</dd>
                    <dt><FormattedMessage id="label.created-by" /></dt>
                    <dd>{tournament.organizer.firstName} {tournament.organizer.lastName}</dd>
                    <dt><FormattedMessage id="label.id" /></dt>
                    <dd>{tournament.id}</dd>
                </dl>

                <h3><FormattedMessage id="page.tournaments.details.participants" /></h3>
                <table>
                    <thead>
                        <tr>
                            <th><FormattedMessage id="table.participant.id" /></th>
                            <th><FormattedMessage id="table.participant.first-name" /></th>
                            <th><FormattedMessage id="table.participant.last-name" /></th>
                            <th><FormattedMessage id="table.participant.result" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {participants.map(participant => (
                            <tr key={participant.id}>
                                <td>{participant.id}</td>
                                <td>{participant.firstName}</td>
                                <td>{participant.lastName}</td>
                                <td>{participant.result ?? <FormattedMessage id="table.participant.no-result" />}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>)}
        </>
    );
}
