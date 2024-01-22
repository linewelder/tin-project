import { FormattedMessage, useIntl } from "react-intl";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    const intl = useIntl();

    return (
        <>
            <h2><FormattedMessage id="page.error.title" /></h2>
            <p>{error.statusText || error.message || error.format(intl)}</p>
        </>
    );
}
