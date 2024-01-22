import { FormattedDate, FormattedMessage } from "react-intl";
import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useApiFetch, usePaginatedFetch } from "../apiContext.jsx";
import Pagination from "../components/Pagination.jsx";

export default function CategoryDetails() {
    const { id } = useParams();

    const [error, setError] = useState(null);
    useEffect(() => { if (error) throw error; }, [error]);

    const path = `/categories/${id}`;
    const category = useApiFetch(path, null, setError);
    const currentTournaments = useApiFetch(path + "/current-tournaments", [], setError);
    const [tournamentHistory, loadTournamentHistory] =
        usePaginatedFetch(path + "/tournament-history", 3, setError);
    const bestParticipants = useApiFetch(path + "/best-participants", [], setError);

    const deleteConfirm = useRef(null);

    return (
        <>
            {category && (<>
                <dialog ref={deleteConfirm}>
                    <h2>
                        <FormattedMessage
                            id="page.categories.details.delete-confirm"
                            values={{ name: category.name }} />
                    </h2>

                    <button className="destructive-btn" onClick={() => deleteConfirm.current.close()}>
                        <FormattedMessage id="button.delete" />
                    </button>
                    <a href="#" onClick={() => deleteConfirm.current.close()}>
                        <FormattedMessage id="button.cancel" />
                    </a>
                </dialog>

                <div className="header-with-buttons">
                    <h2>{category.name}</h2>
                    <div>
                        <Link to="edit" className="button-link">
                            <FormattedMessage id="button.edit" />
                        </Link>
                        <button onClick={() => deleteConfirm.current.showModal()}>
                            <FormattedMessage id="button.delete" />
                        </button>
                    </div>
                </div>

                <p>{category.description}</p>
            </>)}

            {currentTournaments.length > 0 && (<>
                <h3><FormattedMessage id="page.categories.details.current-tournaments" /></h3>
                <table>
                    <thead>
                        <tr>
                            <th><FormattedMessage id="table.tournament.name" /></th>
                            <th><FormattedMessage id="table.tournament.date" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTournaments.map(tournament => (
                            <tr key={tournament.id}>
                                <td>
                                    <Link to={`/tournaments/${tournament.id}`}>
                                        {tournament.name}
                                    </Link></td>
                                <td>{tournament.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>)}

            {tournamentHistory.totalCount > 0 && (<>
                <h3><FormattedMessage id="page.categories.details.tournament-history" /></h3>
                <Pagination
                    pageSize={3}
                    totalCount={tournamentHistory.totalCount}
                    onPageChanged={loadTournamentHistory} />
                <table>
                    <thead>
                        <tr>
                            <th><FormattedMessage id="table.tournament.name" /></th>
                            <th><FormattedMessage id="table.tournament.date" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tournamentHistory.elements.map(tournament => (
                            <tr key={tournament.id}>
                                <td>
                                    <Link to={`/tournaments/${tournament.id}`}>
                                        {tournament.name}
                                    </Link></td>
                                <td>
                                    <FormattedDate value={tournament.date} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>)}

            {bestParticipants.length > 0 && (<>
                <h3><FormattedMessage id="page.categories.details.best-participants" /></h3>
                <table>
                    <thead>
                        <tr>
                            <th><FormattedMessage id="table.best-participants.full-name" /></th>
                            <th><FormattedMessage id="table.best-participants.date" /></th>
                            <th><FormattedMessage id="table.best-participants.result" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {bestParticipants.map(result => (
                            <tr key={result.participantId}>
                                <td>{result.firstName} {result.lastName}</td>
                                <td><FormattedDate value={result.date} /></td>
                                <td>{result.result}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>)}
        </>
    );
}
