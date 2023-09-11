import { RegisterCard } from '@/features/authCards/registerPage';
import { RegisterHelper } from '@/features/authHelpers/registerPage';
import { Gapped } from '@/shared/gapped';

export const Register = () => {
    return (
        <>
            <Gapped vertical verticalAlign="middle" gap="16px">
                <RegisterCard />
                <RegisterHelper />
            </Gapped>
        </>
    );
};
