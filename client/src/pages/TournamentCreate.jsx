import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import Validator from "../Validator";
import { ApiContext, useApiFetch } from "../apiContext";

export default function TournamentCreate() {
    const [inputs, setInputs] = useState({
        name: "",
        date: "",
        address: "",
        idCategory: 1,
    });
    const [errors, setErrors] = useState([]);

    const [ioError, setIoError] = useState(null);
    useEffect(() => { if (ioError) throw ioError; }, [ioError]);
    const categories = useApiFetch("/categories", [], setIoError);

    const onInputsChanged = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const intl = useIntl();
    const api = useContext(ApiContext);

    const onSubmit = async (e) => {
        e.preventDefault();

        const validator = new Validator(intl, inputs);
        validator.notEmpty("name");
        validator.notEmpty("date");
        validator.notEmpty("address");

        const errors = validator.getErrors();
        if (errors.length > 0) {
            setErrors(errors);
            return;
        }

        const [result, error] = await api.post("/tournaments", inputs);
        if (result) {
            navigate("/");
        } else {
            errors.push(error.format(intl));
            setErrors(errors);
        }
    }

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
                    <button onClick={onSubmit}>
                        <FormattedMessage id="button.save" />
                    </button>
                    <Link to="/tournaments">
                        <FormattedMessage id="button.cancel" />
                    </Link>
                </div>
            </div>

            <form>
                <label htmlFor="name"><FormattedMessage id="label.name" /></label>
                <input type="text" id="name" name="name"
                    value={inputs.name} onChange={onInputsChanged}/>
                <br />

                <label htmlFor="date"><FormattedMessage id="label.date" /></label>
                <input type="date" id="date" name="date"
                    value={inputs.date} onChange={onInputsChanged}/>
                <br />

                <label htmlFor="address"><FormattedMessage id="label.address" /></label>
                <input type="text" id="address" name="address"
                    value={inputs.address} onChange={onInputsChanged}/>
                <br />

                <label htmlFor="category"><FormattedMessage id="label.category" /></label>
                <select id="category" name="idCategory"
                    value={inputs.idCategory} onChange={onInputsChanged}
                >
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <br />
            </form>

            <ul className="error">
                {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
            </ul>

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
