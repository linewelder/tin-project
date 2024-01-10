import { FormattedMessage } from "react-intl";

function Home() {
    return (
        <>
            <h2><FormattedMessage id="page.home.title" /></h2>
            <p><FormattedMessage id="page.home.content" /></p>
        </>
    );
}

export default Home;
