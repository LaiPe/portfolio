import { useState, useEffect } from "react";
import useViewport from "../../hooks/useViewport";
import ReactMarkdown from "react-markdown";
import Button from "../../components/common/Button/Button";
import Spinner from "../../components/spinner/Spinner";
import aboutData from "../../data/about.json";
import skillsData from "../../data/skills-complete.json";
import styles from "./AboutPage.module.css";

export default function AboutPage() {
    const { profile, education, certifications, experiences, otherExperiences, passions, values, cv } = aboutData;
    const [profileImageLoaded, setProfileImageLoaded] = useState(false);
    const { isDesktop } = useViewport({ mobile: 768, tablet: 1100 });

    const handleProfileImageLoad = () => {
        setProfileImageLoaded(true);
    };

    const handleDownloadCV = () => {
        const link = document.createElement("a");
        link.href = cv.path;
        link.download = cv.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <title>À propos | Léo Peyronnet - Développeur Web</title>
            <meta name="description" content="Découvrez le parcours de Léo Peyronnet, développeur web full-stack spécialisé React. Formation, expériences et compétences." />

            <main className={styles.about}>
                <div className={styles.layout}>
                    {/* Main Content */}
                    <div className={styles.mainContent}>
                        {/* Hero Section */}
                        <section className={styles.hero}>
                            <div className={styles.heroContent}>
                                <div className={styles.profileInfo}>
                                    <h1 className={styles.name}>{profile.name}</h1>
                                    <p className={styles.title}>{profile.title} - {profile.age} ans</p>
                                    <div className={styles.bio}><ReactMarkdown>{profile.bio}</ReactMarkdown></div>
                                    <div className={styles.heroCta}>
                                        <Button onClick={handleDownloadCV} variant="primary">
                                            📄 Télécharger mon CV
                                        </Button>
                                        <Button to="/contact" variant="outline">
                                            Me contacter
                                        </Button>
                                    </div>
                                </div>
                                <div className={styles.profileImageWrapper}>
                                    {!profileImageLoaded && (
                                        <div className={styles.profileImageSpinner}>
                                            <Spinner />
                                        </div>
                                    )}
                                    <img 
                                        src={profile.photo} 
                                        alt={`Photo de ${profile.name}`}
                                        className={`${styles.profileImage} ${profileImageLoaded ? styles.profileImageLoaded : ''}`}
                                        onLoad={handleProfileImageLoad}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Introduction */}
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionIcon}>👋</span>
                                Qui suis-je ?
                            </h2>
                            <div className={styles.introduction}><ReactMarkdown>{profile.introduction}</ReactMarkdown></div>
                        </section>

                        {/* Skills Sidebar */}
                        {!isDesktop && (
                            <SkillsSidebar displayMode="mobile" />
                        )}

                        {/* Values */}
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionIcon}>💫</span>
                                Ce qui me guide
                            </h2>
                            <div className={styles.valuesGrid}>
                                {values.map((value) => (
                                    <div key={value.id} className={styles.valueCard}>
                                        <span className={styles.valueIcon}>{value.icon}</span>
                                        <h3 className={styles.valueTitle}>{value.title}</h3>
                                        <p className={styles.valueDescription}>{value.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Experiences */}
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionIcon}>💼</span>
                                Expériences
                            </h2>
                            <div className={styles.timeline}>
                                {experiences.map((exp) => (
                                    <div key={exp.id} className={`${styles.timelineItem} ${exp.current ? styles.current : ""}`}>
                                        <div className={styles.timelineDot}></div>
                                        <div className={styles.timelineContent}>
                                            <span className={styles.timelinePeriod}>{exp.period}</span>
                                            <h3 className={styles.timelineTitle}>
                                                {exp.title}
                                                <span className={styles.timelineType}>{exp.type}</span>
                                            </h3>
                                            <p className={styles.timelineCompany}>{exp.company}</p>
                                            <p className={styles.timelineDescription}>{exp.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Education */}
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionIcon}>🎓</span>
                                Formation
                            </h2>
                            <div className={styles.timeline}>
                                {education.map((edu) => (
                                    <div key={edu.id} className={styles.timelineItem}>
                                        <div className={styles.timelineDot}></div>
                                        <div className={styles.timelineContent}>
                                            <span className={styles.timelinePeriod}>{edu.period}</span>
                                            <h3 className={styles.timelineTitle}>{edu.title}</h3>
                                            <p className={styles.timelineCompany}>{edu.institution}</p>
                                            <p className={styles.timelineDescription}>{edu.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Certifications */}
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionIcon}>🏆</span>
                                Certifications
                            </h2>
                            <div className={styles.certificationsGrid}>
                                {certifications.map((cert) => (
                                    <div key={cert.id} className={styles.certificationCard}>
                                        <h3 className={styles.certificationTitle}>{cert.title}</h3>
                                        <p className={styles.certificationIssuer}>{cert.issuer}</p>
                                        <span className={styles.certificationDate}>{cert.date}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Other Experiences */}
                        {otherExperiences.length > 0 && (
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>
                                    <span className={styles.sectionIcon}>🎭</span>
                                    Autres expériences
                                </h2>
                                <div className={styles.timeline}>
                                    {otherExperiences.map((exp) => (
                                        <div key={exp.id} className={styles.timelineItem}>
                                            <div className={styles.timelineDot}></div>
                                            <div className={styles.timelineContent}>
                                                <span className={styles.timelinePeriod}>{exp.period}</span>
                                                <h3 className={styles.timelineTitle}>{exp.title}</h3>
                                                <p className={styles.timelineCompany}>{exp.institution}</p>
                                                <p className={styles.timelineDescription}>{exp.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Passions */}
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionIcon}>❤️</span>
                                En dehors du code
                            </h2>
                            <div className={styles.passionsGrid}>
                                {passions.map((passion) => (
                                    <div key={passion.id} className={styles.passionCard}>
                                        <span className={styles.passionIcon}>{passion.icon}</span>
                                        <h3 className={styles.passionTitle}>{passion.title}</h3>
                                        <p className={styles.passionDescription}>{passion.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* CTA Section */}
                        <section className={styles.ctaSection}>
                            <h2 className={styles.ctaTitle}>Envie de collaborer ?</h2>
                            <p className={styles.ctaText}>
                                Je suis actuellement à la recherche d'opportunités en développement front-end React.
                            </p>
                            <div className={styles.ctaButtons}>
                                <Button onClick={handleDownloadCV} variant="primary" size="lg">
                                    📄 Télécharger mon CV
                                </Button>
                                <Button to="/contact" variant="primary" size="lg">
                                    Me contacter
                                </Button>
                            </div>
                        </section>
                    </div>

                    {/* Skills Sidebar */}
                    {isDesktop && (
                        <SkillsSidebar />
                    )}
                </div>
            </main>
        </>
    );
}

function SkillsSidebar({ displayMode = "desktop" }) {
    const { skills } = skillsData;
    // Mapping des labels de maîtrise vers les classes CSS et labels français
    const masteryConfig = {
        "mastered": { label: "Maîtrisé", className: "mastered" },
        "advanced": { label: "Avancé", className: "advanced" },
        "intermediate": { label: "Intermédiaire", className: "intermediate" },
        "beginner": { label: "Débutant", className: "beginner" },
        "learning": { label: "Apprentissage", className: "learning" }
    };

    const skillsContent = Object.values(skills).map((category) => (
        <div key={category.title} className={styles.skillCategory}>
            <h3 className={styles.skillCategoryTitle}>
                <span className={styles.skillCategoryIcon}>{category.icon}</span>
                {category.title}
            </h3>
            <ul className={styles.skillList}>
                {category.items.map((skill, index) => {
                    const masteryInfo = masteryConfig[skill?.mastery];
                    return (
                        <li key={index} className={styles.skillItem}>
                            <span className={styles.skillName}>{skill.name}</span>
                            <span className={`${styles.skillBadge} ${masteryInfo ? styles[masteryInfo.className] : ''}`}>
                                {masteryInfo?.label}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    ));

    if (displayMode === "mobile") {
        return (
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    <span className={styles.sectionIcon}>🛠️</span>
                    Compétences
                </h2>
                <div className={styles.skillsMobileGrid}>
                    {skillsContent}
                </div>
            </section>
        );
    }

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarSticky}>
                <h2 className={styles.sidebarTitle}>Compétences</h2>
                {skillsContent}
            </div>
        </aside>
    );
}
