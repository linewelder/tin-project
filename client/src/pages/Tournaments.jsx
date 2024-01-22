import { FormattedDate, FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ApiContext, usePagination } from "../apiContext.jsx";
import Pagination from "../components/Pagination.jsx";

function TournamentList({ tournaments }) {
    return (
        <table>
            <thead>
                <tr>
                    <th><FormattedMessage id="table.tournament.id" /></th>
                    <th><FormattedMessage id="table.tournament.name" /></th>
                    <th><FormattedMessage id="table.tournament.date" /></th>
                    <th><FormattedMessage id="table.tournament.category" /></th>
                    <th><FormattedMessage id="table.tournament.status" /></th>
                </tr>
            </thead>
            <tbody>
                {tournaments.map(tournament =>
                    <tr key={tournament.id}>
                        <td>{tournament.id}</td>
                        <td>
                            <Link to={`${tournament.id}`}>
                                {tournament.name}
                            </Link>
                        </td>
                        <td>
                            <FormattedDate value={tournament.date} />
                        </td>
                        <td>{tournament.category}</td>
                        <td>
                            <FormattedMessage id={
                                `table.tournament.status.${tournament.isClosed ? "closed" : "open" }`} />
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default function Categories() {
    const [ error, setError ] = useState(null);
    useEffect(() => { if (error) throw error; }, [error]);

    const api = useContext(ApiContext);
    const userId = api.currentUser?.id;

    const usersTournaments = userId
        ? usePagination(`/users/${userId}/tournaments`, 3, setError)
        : null;
    const tournaments = usePagination("/tournaments", 3, setError);

    return (
        <>
            {usersTournaments && (
                <>
                    <h2><FormattedMessage id="page.tournaments.users" /></h2>
                    <Link to="create" className="button-link">
                        <FormattedMessage id="button.add-new" />
                    </Link>

                    <Pagination pagination={usersTournaments} />
                    <TournamentList tournaments={usersTournaments.elements} />
                </>
            )}

            <h2><FormattedMessage id="page.tournaments.all" /></h2>

            <Pagination pagination={tournaments} />
            <TournamentList tournaments={tournaments.elements} />
        </>
    );
}
