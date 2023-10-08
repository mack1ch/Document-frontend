import { RegisterCard } from '@/features/authCards/registerPage';
import { RegisterHelper } from '@/features/authHelpers/registerPage';
import { Gapped } from '@/shared/gapped';
import styles from './ui.module.scss';

export const Register = () => {
    return (
        <>
            <div className={styles.layout}>
                <div className={styles.center}>
                    <RegisterCard />
                    <RegisterHelper />
                </div>
            </div>
        </>
    );
};
