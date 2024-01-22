import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { IntlProvider } from 'react-intl';
import { ApiContextProvider } from './apiContext.jsx';

import Header from "./components/Header";

import ErrorPage from './pages/ErrorPage.jsx';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Categories from "./pages/Categories";
import CategoryCreate from './pages/CategoryCreate.jsx';
import CategoryDetails from './pages/CategoryDetails.jsx';
import CategoryEdit from './pages/CategoryEdit.jsx';
import Tournaments from "./pages/Tournaments.jsx";
import TournamentCreate from './pages/TournamentCreate.jsx';
import TournamentDetails from './pages/TournamentDetails.jsx';
import TournamentEdit from './pages/TournamentEdit.jsx';
import Participants from './pages/Participants.jsx';
import ParticipantDetails from './pages/ParticipantDetails.jsx';

import English from '../lang/en.json';
const locale = navigator.language;

const Layout = () => (
    <>
        <Header />
        <div className="wrapper">
            <Outlet />
        </div>
    </>
);

const ErrorLayout = () => (
    <>
        <Header />
        <div className="wrapper">
            <ErrorPage />
        </div>
    </>
);

const NarrowLayout = () => (
    <>
        <Header />
        <div className="narrow-wrapper">
            <Outlet />
        </div>
    </>
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorLayout />,
        children: [
            {
                path: "/categories",
                element: <Categories />,
            },
            {
                path: "/categories/:id",
                element: <CategoryDetails />,
            },
            {
                path: "/categories/create",
                element: <CategoryCreate />,
            },
            {
                path: "/categories/:id/edit",
                element: <CategoryEdit />,
            },
            {
                path: "/participants",
                element: <Participants />,
            },
            {
                path: "/participants/:id",
                element: <ParticipantDetails />,
            },
            {
                path: "/tournaments",
                element: <Tournaments />,
            },
            {
                path: "/tournaments/:id",
                element: <TournamentDetails />,
            },
            {
                path: "/tournaments/:id/edit",
                element: <TournamentEdit />,
            },
            {
                path: "/tournaments/create",
                element: <TournamentCreate />,
            },
        ],
    },
    {
        path: "/",
        element: <NarrowLayout />,
        errorElement: <ErrorLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <IntlProvider locale={locale} messages={English}>
            <ApiContextProvider>
                <RouterProvider router={router} />
            </ApiContextProvider>
        </IntlProvider>
    </React.StrictMode>
);
