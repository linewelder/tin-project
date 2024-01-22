import { FormattedDate, FormattedMessage } from "react-intl";
import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useApiFetch, usePagination } from "../apiContext.jsx";
import Pagination from "../components/Pagination.jsx";

export default function TournamentDetails() {
    const { id } = useParams();

    const [error, setError] = useState(null);
    useEffect(() => { if (error) throw error; }, [error]);

    const path = `/tournaments/${id}`;
    const tournament = useApiFetch(path, null, setError);
    const participants = usePagination(path + "/participants", 3, setError);

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
                    <div>
                        <Link to="edit" className="button-link">
                            <FormattedMessage id="button.edit" />
                        </Link>
                        <button onClick={() => deleteConfirm.current.showModal()}>
                            <FormattedMessage id="button.delete" />
                        </button>
                    </div>
                </div>
                
                <dl>
                    <dt><FormattedMessage id="label.date" /></dt>
                    <dd><FormattedDate value={tournament.date} /></dd>
                    <dt><FormattedMessage id="label.address" /></dt>
                    <dd>{tournament.address}</dd>
                    <dt><FormattedMessage id="label.category" /></dt>
                    <dd>{tournament.category}</dd>
                    <dt><FormattedMessage id="label.created-by" /></dt>
                    <dd>{tournament.organizer.firstName} {tournament.organizer.lastName}</dd>
                    <dt><FormattedMessage id="label.id" /></dt>
                    <dd>{tournament.id}</dd>
                </dl>

                <h3><FormattedMessage id="page.tournaments.details.participants" /></h3>

                <Pagination pagination={participants} />
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
                        {participants.elements.map(participant => (
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
