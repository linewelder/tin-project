import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { IntlProvider } from 'react-intl';
import { ApiContextProvider } from './apiContext.jsx';

import Header from "./components/Header";

import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Categories from "./pages/Categories";

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
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/categories",
                element: <Categories />,
            }
        ],
    },
    {
        path: "/",
        element: <NarrowLayout />,
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
