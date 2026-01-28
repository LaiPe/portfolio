import Button from "../../components/common/Button/Button";
import SkillCard from "../../components/skills/SkillCard/SkillCard";
import ProjectCard from "../../components/projects/ProjectCard/ProjectCard";
import ServiceCard from "../../components/services/ServiceCard/ServiceCard";
import Threads from "../../components/backgrounds/threads/Threads";

import useCollection from "../../hooks/useCollection";
import skillsData from "../../data/skills.json";
import styles from "./HomePage.module.css";
import "../../assets/css/homepage.css";

export default function HomePage() {
    const { skills } = skillsData;
    const { data: projects, loading: loadingProjects } = useCollection("projects");
    const { data: services, loading: loadingServices } = useCollection("services");

    const featuredProjects = projects
        .filter(p => p.featured)
        .sort((a, b) => a.priority - b.priority);
    const featuredServices = services.filter(s => s.featured);

    const scrollToContact = (e) => {
        e.preventDefault();
        document.querySelector("footer")?.scrollIntoView({ behavior: "smooth" });
    };

    if (loadingProjects || loadingServices) {
        return <div className={styles.loading}>Chargement...</div>;
    }

    return (
        <main className={styles.home}>
            {/* Hero Section */}
            <section className={styles.hero} style={{ width: '100%', height: '600px', position: 'relative' }}>
                <Threads
                    amplitude={3.5}
                    distance={0.5}
                    enableMouseInteraction
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
                />
                <div className={styles.heroContent} style={{ position: 'relative', zIndex: 1 }}>
                    <h1 className={styles.heroTitle}>Léo Peyronnet</h1>
                    <p className={styles.heroSubtitle}>
                        Développeur Full-Stack <strong>React</strong> & <strong>Spring Boot</strong>
                    </p>
                    <p className={styles.heroSpecialization}>
                        Spécialisé Front-End React
                    </p>
                    <div className={styles.heroCtas}>
                        <Button to="/projets" variant="primary" size="lg">
                            Voir mes projets
                        </Button>
                        <Button onClick={scrollToContact} variant="secondary" size="lg">
                            Me contacter
                        </Button>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className={styles.skills}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Compétences Clés</h2>
                    <div className={styles.skillsGrid}>
                        {Object.values(skills).map((skill) => (
                            <SkillCard
                                key={skill.title}
                                title={skill.title}
                                icon={skill.icon}
                                items={skill.items}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Projects Section */}
            <section className={styles.projects}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Projets Phares</h2>
                    <p className={styles.sectionSubtitle}>
                        Une sélection de mes réalisations les plus significatives
                    </p>
                    <div className={styles.projectsGrid}>
                        {featuredProjects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                size={index === 0 ? "large" : "medium"}
                            />
                        ))}
                    </div>
                    <div className={styles.projectsCta}>
                        <Button to="/projets" variant="outline">
                            Voir tous les projets →
                        </Button>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className={styles.services}>
                <div className={styles.container}>
                    <div className={styles.servicesHeader}>
                        <span className={styles.servicesIcon}>🎯</span>
                        <h2 className={styles.sectionTitle}>Vous cherchez un développeur web ?</h2>
                    </div>
                    <div className={styles.servicesGrid}>
                        {featuredServices.map((service) => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                    <div className={styles.servicesCta}>
                        <Button to="/services" variant="outline">
                            Voir toutes les offres →
                        </Button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.cta}>
                <div className={styles.container}>
                    <h2 className={styles.ctaTitle}>Prêt à démarrer votre projet ?</h2>
                    <p className={styles.ctaText}>
                        Discutons de vos besoins et trouvons ensemble la meilleure solution.
                    </p>
                    <Button onClick={scrollToContact} variant="primary" size="lg">
                        Contactez-moi
                    </Button>
                </div>
            </section>
        </main>
    );
}