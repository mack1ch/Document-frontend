import { FC } from 'react';
import styles from './ui.module.scss';

export interface TableStateCircleProps {
    state: number;
}

/**
 * 0 - Аннулирован
  1 - Требуется согласование (для делопроизводителя)
  2 - Требуется согласование (для юриста)
  3 - Требуется согласование (для руководителя)
  4 - Документ подписан
 */
export const TableStateCircle: FC<TableStateCircleProps> = ({ state = 'signature required' }) => {
    return (
        <>
            <div
                style={{
                    backgroundColor:
                        state === 1
                            ? '#D9D9D9'
                            : state === 3
                            ? '#EDC156'
                            : state === 4
                            ? '#5A9C46'
                            : state === 2
                            ? '#55BD7F'
                            : '#ED5656',
                }}
                className={styles.circle}></div>
        </>
    );
};
