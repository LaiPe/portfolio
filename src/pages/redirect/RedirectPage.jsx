import Button from "../../components/common/Button/Button";
import styles from "./RedirectPage.module.css";

export default function RedirectPage() {

    return (
        <main className={styles.redirect}>
            <title>Ça vous a plu ? | Léo Peyronnet - Portfolio</title>
            <meta name="description" content="Page de redirection vers le portfolio de Léo Peyronnet" />

            <section className={styles.hero}>
                <div className={styles.content}>
                    <div className={styles.heading}>
                        <h1 className={styles.title}>Ça vous a plu ?</h1>
                        <p className={styles.subtitle}>Le site que vous venez de consulter était une maquette.</p>
                    </div>

                    <div className={styles.actions}>
                        <p className={styles.actionItem}>
                            <span className={styles.label}>Vous êtes intrigué ?</span>
                            <Button to="/projets" variant="secondary" size="lg">
                                Consulter mes projets
                            </Button>
                        </p>
                        <p className={styles.actionItem}>
                            <span className={styles.label}>Vous êtes intéressé ?</span>
                            <Button to="/contact" variant="secondary" size="lg">
                                Rentrons en contact !
                            </Button>
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
