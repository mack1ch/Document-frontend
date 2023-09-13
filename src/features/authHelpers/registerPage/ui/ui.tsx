import Link from 'next/link';
import styles from './ui.module.scss';

export const RegisterHelper = () => {
    return (
        <dl className={styles.layout}>
            <dt className={styles.registerDone}>Уже регистрировались в сервисах Inverse?</dt>
            <Link href="/auth" className={styles.auth}>
                Войдите в учетную запись
            </Link>
        </dl>
    );
};
