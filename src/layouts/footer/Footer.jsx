import styles from './Footer.module.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/l%C3%A9o-peyronnet-124a86278/',
            icon: 'img/icons/linkedIn-icon.png'
        },
        {
            name: 'GitHub',
            url: 'https://github.com/LaiPe',
            icon: 'img/icons/github-icon.png'
        },
        {
            name: 'Malt',
            url: 'https://www.malt.fr/profile/leopeyronnet',
            icon: 'img/icons/malt-icon.png'
        }
    ];

    const quickLinks = [
        { name: 'Accueil', path: '/' },
        { name: 'Projets', path: '/projects' },
        { name: 'Services', path: '/services' },
        { name: 'À propos', path: '/about' }
    ];

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.content}>
                    {/* Section À propos */}
                    <div className={styles.section}>
                        <div className={styles.logoTitle}>
                            <img src="img/logo_lp_raw.png" alt="Logo Léo Peyronnet" className={styles.logo} />
                            <h3 className={styles.title}>Léo Peyronnet</h3>
                        </div>
                        <p className={styles.description}>
                            Développeur Full-Stack React<br />
                            Spécialisé Front-End React
                        </p>
                        <p className={styles.tagline}>
                            Transformons vos idées en solutions digitales modernes et performantes.
                        </p>
                    </div>

                    {/* Section Navigation rapide */}
                    <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>Navigation</h4>
                        <nav className={styles.quickLinks}>
                            {quickLinks.map((link) => (
                                <a 
                                    key={link.path}
                                    href={link.path} 
                                    className={styles.link}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Section Contact */}
                    <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>Me contacter</h4>
                        <p className={styles.contactText}>
                            Une question ? Un projet ?<br />
                            Discutons-en !
                        </p>
                        <a 
                            href="mailto:leo.peyronnet@example.com" 
                            className={styles.ctaButton}
                        >
                            Envoyez-moi un message
                        </a>
                    </div>

                    {/* Section Réseaux sociaux */}
                    <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>Suivez-moi</h4>
                        <div className={styles.socialLinks}>
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.socialLink}
                                    aria-label={social.name}
                                    title={social.name}
                                >
                                    <img 
                                        src={social.icon} 
                                        alt={`${social.name} icon`}
                                        className={styles.socialIcon}
                                    />
                                    <span className={styles.socialName}>{social.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className={styles.copyright}>
                    <p>© {currentYear} Léo Peyronnet. Tous droits réservés.</p>
                    <div className={styles.legalLinks}>
                        <a href="/mentions-legales" className={styles.legalLink}>
                            Mentions légales
                        </a>
                        <span className={styles.separator}>•</span>
                        <a href="/confidentialite" className={styles.legalLink}>
                            Confidentialité
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}