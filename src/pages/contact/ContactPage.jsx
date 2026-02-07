import { useForm } from 'react-hook-form';
import Button from "../../components/common/Button/Button";
import styles from "./ContactPage.module.css";
import socialsData from '../../data/socials.json';

export default function ContactPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm();

    const { socialLinks } = socialsData;

    const onSubmit = (data) => {
        const subject = encodeURIComponent(`Contact Portfolio - ${data.subject || 'Nouveau message'}`);
        const body = encodeURIComponent(
            `Nom: ${data.name}\n` +
            `Email: ${data.email}\n` +
            `Sujet: ${data.subject || 'Non spécifié'}\n\n` +
            `Message:\n${data.message}`
        );
        
        window.location.href = `mailto:peyronnet.leo@gmail.com?subject=${subject}&body=${body}`;
        reset();
    };

    return (
        <main className={styles.contact}>
            <title>Contact | Léo Peyronnet - Développeur Web</title>
            <meta name="description" content="Contactez Léo Peyronnet pour vos projets de développement web. Devis gratuit et réponse rapide." />

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Travaillons ensemble</h1>
                    <p className={styles.subtitle}>
                        Une question, un projet ou simplement envie d'échanger ?<br />
                        N'hésitez pas à me contacter, je vous répondrai rapidement.
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <section className={styles.content}>
                <div className={styles.container}>
                    <div className={styles.grid}>
                        {/* Contact Form */}
                        <div className={styles.formSection}>
                            <h2 className={styles.sectionTitle}>Envoyez-moi un message</h2>
                            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name" className={styles.label}>
                                        Nom <span className={styles.required}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                                        placeholder="Votre nom complet"
                                        {...register('name', {
                                            required: 'Le nom est requis',
                                            minLength: {
                                                value: 2,
                                                message: 'Le nom doit contenir au moins 2 caractères'
                                            }
                                        })}
                                    />
                                    {errors.name && (
                                        <span className={styles.errorMessage}>{errors.name.message}</span>
                                    )}
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="email" className={styles.label}>
                                        Email <span className={styles.required}>*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                                        placeholder="votre@email.com"
                                        {...register('email', {
                                            required: 'L\'email est requis',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Adresse email invalide'
                                            }
                                        })}
                                    />
                                    {errors.email && (
                                        <span className={styles.errorMessage}>{errors.email.message}</span>
                                    )}
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="subject" className={styles.label}>
                                        Sujet
                                    </label>
                                    <select
                                        id="subject"
                                        className={styles.select}
                                        {...register('subject')}
                                    >
                                        <option value="">Sélectionnez un sujet</option>
                                        <option value="Site vitrine">Site vitrine</option>
                                        <option value="E-commerce">E-commerce</option>
                                        <option value="Application web">Application web</option>
                                        <option value="Opportunité CDI">Opportunité CDI / Recrutement</option>
                                        <option value="Autre">Autre</option>
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="message" className={styles.label}>
                                        Message <span className={styles.required}>*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                                        placeholder="Décrivez votre projet ou votre demande..."
                                        rows={6}
                                        {...register('message', {
                                            required: 'Le message est requis',
                                            minLength: {
                                                value: 20,
                                                message: 'Le message doit contenir au moins 20 caractères'
                                            }
                                        })}
                                    />
                                    {errors.message && (
                                        <span className={styles.errorMessage}>{errors.message.message}</span>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    disabled={isSubmitting}
                                    className={styles.submitButton}
                                >
                                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                                </Button>

                                <p className={styles.formNote}>
                                    <span className={styles.required}>*</span> Champs obligatoires
                                </p>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className={styles.infoSection}>
                            <div className={styles.infoCard}>
                                <h2 className={styles.sectionTitle}>Informations de contact</h2>
                                
                                <div className={styles.infoItem}>
                                    <span className={styles.infoIcon}>📧</span>
                                    <div className={styles.infoContent}>
                                        <h3 className={styles.infoLabel}>Email</h3>
                                        <a href="mailto:peyronnet.leo@gmail.com" className={styles.infoLink}>
                                            peyronnet.leo@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <span className={styles.infoIcon}>📍</span>
                                    <div className={styles.infoContent}>
                                        <h3 className={styles.infoLabel}>Localisation</h3>
                                        <p className={styles.infoText}>Clermont-Ferrand, France</p>
                                        <p className={styles.infoSubtext}>Disponible en remote</p>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <span className={styles.infoIcon}>⏰</span>
                                    <div className={styles.infoContent}>
                                        <h3 className={styles.infoLabel}>Disponibilité</h3>
                                        <p className={styles.infoText}>Réponse sous 24-48h</p>
                                        <p className={styles.infoSubtext}>Du lundi au vendredi</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className={styles.socialCard}>
                                <h3 className={styles.socialTitle}>Me retrouver sur</h3>
                                <div className={styles.socialLinks}>
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.socialLink}
                                            aria-label={social.name}
                                        >
                                            <img
                                                src={social.icon}
                                                alt={`${social.name} icon`}
                                                className={styles.socialIcon}
                                            />
                                            <div className={styles.socialInfo}>
                                                <span className={styles.socialName}>{social.name}</span>
                                                <span className={styles.socialDesc}>{social.description}</span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
