import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

export default function TournamentCreate() {
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState([]);

    const addParticipant = useRef(null);

    return (
        <>
            <dialog ref={addParticipant}>
                <h2><FormattedMessage id="page.tournaments.create.add-participant" /></h2>
                <div className="Pagination">
                    <button>&lt;&lt;</button>
                    Page 1 out of 10
                    <button>&gt;&gt;</button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th><FormattedMessage id="table.participant.id" /></th>
                            <th><FormattedMessage id="table.participant.first-name" /></th>
                            <th><FormattedMessage id="table.participant.last-name" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>John</td>
                            <td>Doe</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jane</td>
                            <td>Smith</td>
                        </tr>
                    </tbody>
                </table>
                <br />

                <button onClick={() => addParticipant.current.close()}>
                    <FormattedMessage id="button.add" />
                </button>
                <a href="#" onClick={() => addParticipant.current.close()}>
                    <FormattedMessage id="button.cancel" />
                </a>
            </dialog>

            <div className="header-with-buttons">
                    <h2><FormattedMessage id="page.tournaments.create.title" /></h2>
                    <div>
                        <button>
                            <FormattedMessage id="button.save" />
                        </button>
                        <Link to="/tournaments">
                            <FormattedMessage id="button.cancel" />
                        </Link>
                    </div>
                </div>

            <form>
                <label><FormattedMessage id="label.name" /></label>
                <input type="text" />
                <br />

                <label><FormattedMessage id="label.date" /></label>
                <input type="date" />
                <br />

                <label><FormattedMessage id="label.category" /></label>
                <select defaultValue={"3x3x3"}>
                    <option>3x3x3</option>
                    <option>4x4x4</option>
                    <option>Skewb</option>
                </select>
                <br />
            </form>

            <h3><FormattedMessage id="page.tournaments.details.participants" /></h3>

            <button onClick={() => addParticipant.current.showModal()}>
                <FormattedMessage id="page.tournaments.create.add-participant" />
            </button>

            <div className="Pagination">
                <button>&lt;&lt;</button>
                Page 1 out of 1
                <button>&gt;&gt;</button>
            </div>

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
                    <tr>
                        <td>1</td>
                        <td>John</td>
                        <td>Doe</td>
                        <td><a href="#"><FormattedMessage id="button.delete" /></a></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jane</td>
                        <td>Smith</td>
                        <td><a href="#"><FormattedMessage id="button.delete" /></a></td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}
