import { index, route, layout } from "@react-router/dev/routes";

export default [
    index("../src/pages/home/HomePage.jsx"),
    route("projets", "../src/pages/projects/ProjectsPage.jsx"),
    route("projets/:slug", "../src/pages/project-detail/ProjectDetailPage.jsx"),
    route("apropos", "../src/pages/about/AboutPage.jsx"),
    route("services", "../src/pages/services/ServicesPage.jsx"),
    route("contact", "../src/pages/contact/ContactPage.jsx"),
];
