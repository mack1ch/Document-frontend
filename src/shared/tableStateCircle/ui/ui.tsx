import { FC } from 'react';
import styles from './ui.module.scss';

export interface TableStateCircleProps {
    state: 'signed_approval' | 'signature_required' | 'signed_agreed_upon' | 'signed' | 'canceled';
}

export const TableStateCircle: FC<TableStateCircleProps> = ({ state = 'signature required' }) => {
    return (
        <>
            <div
                style={{
                    backgroundColor:
                        state === 'signed_approval'
                            ? '#D9D9D9'
                            : state === 'signature_required'
                            ? '#EDC156'
                            : state === 'signed_agreed_upon'
                            ? '#5A9C46'
                            : state === 'signed'
                            ? '#55BD7F'
                            : '#ED5656',
                }}
                className={styles.circle}></div>
        </>
    );
};
