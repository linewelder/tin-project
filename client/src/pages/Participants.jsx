import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ApiContext, usePagination } from "../apiContext.jsx";
import Pagination from "../components/Pagination.jsx";

export default function Participants() {
    const [ error, setError ] = useState(null);
    useEffect(() => { if (error) throw error; }, [error]);

    const participants = usePagination("/participants", 3, setError);

    const api = useContext(ApiContext);
    const canEdit = api.currentUser?.admin || false;

    return (
        <>
            <h2><FormattedMessage id="page.participants.title" /></h2>
            {canEdit && <Link to="create" className="button-link">
                <FormattedMessage id="button.add-new" />
            </Link>}

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
