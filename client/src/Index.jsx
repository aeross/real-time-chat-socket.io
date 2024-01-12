import { createBrowserRouter, redirect } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const router = createBrowserRouter([
    {
        path: "/",
        loader: () => redirect("/login")
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/home",
        element: <Home />,
        loader: () => {
            // user authentication
            const token = localStorage.getItem("token");
            if (!token) return redirect("/login");
            return null;
        }
    }
]);

export default router;