import { FormattedMessage } from "react-intl";
import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useApiFetch } from "../apiContext.jsx";

export default function CategoryDetails() {
    const { id } = useParams();

    const [category, setCategory] = useState(null);
    const [currentTournaments, setCurrentTournaments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => { if (error) throw error; }, [error]);
    useApiFetch(`/categories/${id}`, setCategory, setError);

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

                <h2>
                    {category.name}
                    <span className="title-controls">
                        <Link to="edit">
                            <FormattedMessage id="button.edit" />
                        </Link>
                        <a href="#" onClick={() => deleteConfirm.current.showModal()}>
                            <FormattedMessage id="button.delete" />
                        </a>
                    </span>
                </h2>

                <p>{category.description}</p>
            </>)}
        </>
    );
}
