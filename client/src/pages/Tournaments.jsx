import { FormattedDate, FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePaginatedFetch } from "../apiContext.jsx";
import Pagination from "../components/Pagination.jsx";

export default function Categories() {
    const [ error, setError ] = useState(null);
    useEffect(() => { if (error) throw error; }, [error]);

    const [tournaments, loadTournaments] = usePaginatedFetch("/tournaments", 3, setError);

    return (
        <>
            <h2><FormattedMessage id="page.tournaments.all" /></h2>

            <Link to="create" className="button-link">
                <FormattedMessage id="button.add-new" />
            </Link>

            <Pagination
                pageSize={3}
                totalCount={tournaments.totalCount}
                onPageChanged={loadTournaments} />

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
                    {tournaments.elements.map(tournament =>
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
        </>
    );
}
