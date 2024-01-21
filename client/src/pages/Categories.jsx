import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApiFetch } from "../apiContext.jsx";

export default function Categories() {
    const [ error, setError ] = useState(null);
    useEffect(() => { if (error) throw error; }, [error]);

    const categories = useApiFetch("/categories", [], setError);

    return (
        <>
            <h2><FormattedMessage id="page.categories.title" /></h2>

            <Link to="/categories/create" className="button-link">
                <FormattedMessage id="button.add-new" />
            </Link>
            <table>
                <thead>
                    <tr>
                        <th><FormattedMessage id="table.category.id" /></th>
                        <th><FormattedMessage id="table.category.name" /></th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category =>
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>
                                <Link to={`${category.id}`}>
                                    {category.name}
                                </Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}
