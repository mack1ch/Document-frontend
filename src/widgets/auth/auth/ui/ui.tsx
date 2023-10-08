import styles from './ui.module.scss';
import { AuthCard } from '@/features/authCards/authPage';
import { AuthHelper } from '@/features/authHelpers/authPage';

export const Auth = () => {
    return (
        <>
            <div className={styles.layout}>
                <div className={styles.center}>
                    <AuthCard />
                    <AuthHelper />
                </div>
            </div>
        </>
    );
};
