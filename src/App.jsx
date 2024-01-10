import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Header from "./components/Header";

import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

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

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
