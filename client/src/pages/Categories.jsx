import axios from "axios";
import { FormattedMessage } from "react-intl";
import { Link, useLoaderData } from "react-router-dom";

export async function loader() {
    const categories = (await axios.get("http://localhost:8800/api/categories")).data;
    return { categories };
}

export default function Categories() {
    const { categories } = useLoaderData();

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
