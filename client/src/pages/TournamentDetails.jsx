import { FormattedDate, FormattedMessage } from "react-intl";
import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useApiFetch } from "../apiContext.jsx";

export default function TournamentDetails() {
    const { id } = useParams();

    const [error, setError] = useState(null);
    useEffect(() => { if (error) throw error; }, [error]);

    const path = `/tournaments/${id}`;
    const tournament = useApiFetch(path, null, setError);

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
                    <dt><FormattedMessage id="label.category" /></dt>
                    <dd>{tournament.category}</dd>
                    <dt><FormattedMessage id="label.created-by" /></dt>
                    <dd>{tournament.organizer.firstName} {tournament.organizer.lastName}</dd>
                    <dt><FormattedMessage id="label.id" /></dt>
                    <dd>{tournament.id}</dd>
                </dl>
            </>)}
        </>
    );
}
