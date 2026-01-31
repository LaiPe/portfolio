import { createBrowserRouter, Outlet, RouterProvider, useNavigation, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "./components/spinner/Spinner";
import Header from "./layouts/header/Header";
import Footer from "./layouts/footer/Footer";
import HomePage from "./pages/home/HomePage";
import ContactPage from "./pages/contact/ContactPage";
import ProjectsPage from "./pages/projects/ProjectsPage";
import ProjectDetailPage from "./pages/project-detail/ProjectDetailPage";

// Composant pour scroller vers le haut à chaque changement de route
function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [pathname]);

    return null;
}

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
                path: "projets/:slug",
                element: <ProjectDetailPage />
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
            <ScrollToTop />
            <Header/>
            {state === "loading" ? <Spinner /> : children}
            <Footer />
        </>
    );
}

export default function Router() {
    return <RouterProvider router={router} />;
}

