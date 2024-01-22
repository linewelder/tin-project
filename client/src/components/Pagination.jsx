import { useState } from "react";
import { FormattedMessage } from "react-intl";
import "./Pagination.jsx.css";

export default function Pagination({ onPageChanged, pageSize, totalCount }) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(totalCount / pageSize);

    const previousPage = () => {
        if (currentPage <= 1) return;
        const newPage = currentPage - 1;
        setCurrentPage(newPage);
        onPageChanged((newPage - 1) * pageSize, pageSize);
    };

    const nextPage = () => {
        if (currentPage >= totalPages) return;
        const newPage = currentPage + 1;
        setCurrentPage(newPage);
        onPageChanged((newPage - 1) * pageSize, pageSize);
    };

    return (
        <div className="Pagination">
            <button onClick={previousPage}>&lt;&lt;</button>
            <FormattedMessage id="label.pagination" values={{ currentPage, totalPages }} />
            <button onClick={nextPage}>&gt;&gt;</button>
        </div>
    );
}
