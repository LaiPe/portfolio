import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    isRouteErrorResponse,
    useNavigation,
    useLocation,
} from "react-router";

import { useState, useEffect } from "react";
import Header from "../src/layouts/header/Header";
import Footer from "../src/layouts/footer/Footer";
import Spinner from "../src/components/spinner/Spinner";

import "../src/assets/css/theme.css";
import "../src/assets/css/fonts.css";

export function Layout({ children }) {
    return (
        <html lang="fr">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" type="image/svg+xml" href="/vite.svg" />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    const { state } = useNavigation();
    const { pathname } = useLocation();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setIsReady(false);
        const timer = requestAnimationFrame(() => {
            setIsReady(true);
        });
        return () => cancelAnimationFrame(timer);
    }, [pathname]);

    const isLoading = state === "loading" || !isReady;

    return (
        <>
            <Header />
            {isLoading ? <Spinner fullscreen /> : <Outlet />}
            {!isLoading && <Footer />}
        </>
    );
}

export function ErrorBoundary({ error }) {
    let message = "Oops !";
    let details = "Une erreur inattendue s'est produite.";
    let stack;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Erreur";
        details =
            error.status === 404
                ? "La page demandée n'a pas été trouvée."
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main style={{ padding: "2rem", textAlign: "center" }}>
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre style={{ overflow: "auto", padding: "1rem" }}>
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    );
}
