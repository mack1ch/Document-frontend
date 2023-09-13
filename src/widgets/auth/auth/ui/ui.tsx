import { Gapped } from '@/shared/gapped';
import styles from './ui.module.scss';
import { AuthCard } from '@/features/authCards/authPage';
import { AuthHelper } from '@/features/authHelpers/authPage';

export const Auth = () => {
    return (
        <>
            <div className={styles.layout}>
                <Gapped verticalAlign="middle" vertical gap="16px">
                    <AuthCard />
                    <AuthHelper />
                </Gapped>
            </div>
        </>
    );
};
