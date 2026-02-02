import styles from './Spinner.module.css';

export default function Spinner({ small = false, fullscreen = false, className = '', ...props }) {
    return (
        <div className={`${styles.spinnerContainer} ${fullscreen ? styles.fullscreen : ''} ${className}`} {...props}>
            <div className={`${styles.spinner} ${small ? styles.small : ''}`}></div>
        </div>
    );
}