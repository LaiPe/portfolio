import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    isRouteErrorResponse,
    useNavigation
} from "react-router";

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
                <Favicon />
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

    const isLoading = state === "loading";

    return (
        <>
            <Header />
            {isLoading ? <Spinner fullscreen /> : <Outlet />}
            {!isLoading && <Footer />}
        </>
    );
}

function Favicon() {
    return (
        <>
            {/* Favicon fallback (navigateurs sans support media queries) */}
            <link 
                rel="icon" 
                type="image/png" 
                href="/img/icone-lp-mid.png" 
            />
            {/* Favicon dynamique selon le thème du système */}
            <link 
                rel="icon" 
                type="image/png" 
                href="/img/icone_lp_light.png" 
                media="(prefers-color-scheme: light)"
            />
            <link 
                rel="icon" 
                type="image/png" 
                href="/img/icone_lp_dark.png" 
                media="(prefers-color-scheme: dark)"
            />
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
