import { createBrowserRouter, Outlet, RouterProvider, useNavigation } from "react-router-dom";
import Spinner from "./components/spinner/Spinner";
import Header from "./layouts/header/Header";
import Footer from "./layouts/footer/Footer";
import HomePage from "./pages/home/HomePage";
import ContactPage from "./pages/contact/ContactPage";
import ProjectsPage from "./pages/projects/ProjectsPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root><Outlet /></Root>,
        children: [
            {
                path: "",
                element: <HomePage />
            },
            {
                path: "projets",
                element: <ProjectsPage />
            },
            {
                path: "contact",
                element: <ContactPage />
            },
        ]
    }
]);

function Root({ children }) {
    const { state } = useNavigation();
    return (
        <>
            <Header/>
            {state === "loading" ? <Spinner /> : children}
            <Footer />
        </>
    );
}

export default function Router() {
    return <RouterProvider router={router} />;
}

