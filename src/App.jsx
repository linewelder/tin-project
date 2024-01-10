import { createBrowserRouter, RouterProvider, Outlet, NavLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import Home from "./pages/Home";
import About from "./pages/About";

const Layout = () => (
    <>
        <header>
            <div className="header-wrapper">
                <div>
                    <NavLink to="/">
                        <FormattedMessage id="nav.home" />
                    </NavLink>
                    <NavLink to="/about">
                        <FormattedMessage id="nav.about" />
                    </NavLink>
                </div>
                <div>
                    <span id="user-name">
                        Jan Nowak
                    </span>
                    <button id="logout-btn">
                        <FormattedMessage id="button.logout" />
                    </button>
                </div>
            </div>
        </header>
        <div className="wrapper">
            <Outlet />
        </div>
    </>
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/about",
                element: <About />,
            },
        ],
    },
]);

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
