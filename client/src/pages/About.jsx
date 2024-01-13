import { FormattedMessage } from "react-intl";

function About() {
    return (
        <>
            <h2><FormattedMessage id="page.about.title" /></h2>
            <p><FormattedMessage id="page.about.content" /></p>
        </>
    );
}

export default About;
