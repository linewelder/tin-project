import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePagination } from "../apiContext.jsx";
import Pagination from "../components/Pagination.jsx";

export default function Participants() {
    const [ error, setError ] = useState(null);
    useEffect(() => { if (error) throw error; }, [error]);

    const participants = usePagination("/participants", 3, setError);

    return (
        <>
            <h2><FormattedMessage id="page.participants.title" /></h2>
            <Link to="create" className="button-link">
                <FormattedMessage id="button.add-new" />
            </Link>

            <Pagination pagination={participants} />
            <table>
                <thead>
                    <tr>
                        <th><FormattedMessage id="table.participant.id" /></th>
                        <th><FormattedMessage id="table.participant.first-name" /></th>
                        <th><FormattedMessage id="table.participant.last-name" /></th>
                    </tr>
                </thead>
                <tbody>
                    {participants.elements.map(participant =>
                        <tr key={participant.id}>
                            <td>{participant.id}</td>
                            <td><Link to={`${participant.id}`}>{participant.firstName}</Link></td>
                            <td><Link to={`${participant.id}`}>{participant.lastName}</Link></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}
