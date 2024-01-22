import { useEffect, useRef } from "react";
import Pagination from "./Pagination";
import { FormattedMessage } from "react-intl";

export default function AddParticipantDialog({ pagination, onAdd, isAdded, open, onClose }) {
    const dialog = useRef(null);
    useEffect(() => {
        if (open) {
            dialog.current.showModal();
        } else {
            dialog.current.close();
        }
    }, [open]);

    return (
        <dialog ref={dialog}>
            <h2><FormattedMessage id="page.tournaments.create.add-participant" /></h2>
            <Pagination pagination={pagination} />
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
                    {pagination.elements.map(participant => (
                        <tr key={participant.id}>
                            <td>{participant.id}</td>
                            <td>{participant.firstName}</td>
                            <td>{participant.lastName}</td>
                            <td>
                                {!isAdded(participant) &&
                                    <button onClick={() => onAdd(participant)}>
                                        <FormattedMessage id="button.add" />
                                    </button>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />

            <button onClick={onClose}>
                <FormattedMessage id="button.close" />
            </button>
        </dialog>
    );
}
