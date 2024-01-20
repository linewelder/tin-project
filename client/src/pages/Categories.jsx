import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../apiContext";

export default function Categories() {
    const [ categories, setCategories ] = useState([]);

    const api = useContext(ApiContext);
    useEffect(() => {
        (async () => {
            const [categories, error] = await api.get("/categories");
            if (error) {
                setCategories([]);
            } else {
                setCategories(categories);
            }
        })();
    }, []);

    return (
        <>
            <h2><FormattedMessage id="page.categories.title" /></h2>

            <Link to="/categories/create" className="button-link">Add New</Link>
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
                            <td>{category.name}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}
