import { FormattedMessage } from "react-intl";
import { Link, useLoaderData } from "react-router-dom";

export async function loader() {
    const categories = [
        {
            id: 1,
            name: "3x3x3",
        },
        {
            id: 2,
            name: "4x4x4",
        },
        {
            id: 3,
            name: "Skewb",
        },
    ];

    return { categories };
}

export default function Categories() {
    const { categories } = useLoaderData();

    return (
        <>
            <h2><FormattedMessage id="page.categories.title" /></h2>

            <Link to="/categories/create" class="button-link">Add New</Link>
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
