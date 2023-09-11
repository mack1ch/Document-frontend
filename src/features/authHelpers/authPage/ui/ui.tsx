import Link from 'next/link';
import styles from './ui.module.scss';

export const AuthHelper = () => {
    return (
        <dl className={styles.layout}>
            <dt className={styles.registerDone}>Еще не регистрировались в сервисах Inverse?</dt>
            <Link href="/" className={styles.auth}>
                Зарегистрируйтесь
            </Link>
        </dl>
    );
};
