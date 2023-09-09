'use client';

import styles from './ui.module.scss';
import { useState } from 'react';
export interface ButtonDropDownListProps {
    id: number;
    title: string;
    active: number;
    value: string;
}

const data: ButtonDropDownListProps[] = [
    {
        id: 0,
        title: 'Документы',
        value: 'Документы',
        active: 0,
    },
    {
        id: 1,
        title: 'Документы с подписями',
        value: 'Документы с подписями',
        active: 1,
    },
    {
        id: 2,
        title: 'Документообороты целиком',
        value: 'Документообороты целиком',
        active: 2,
    },
];

export const ButtonDropDownList = () => {
    const [choose, setChoose] = useState<string>('');
    const onClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const selectedValue = event.currentTarget.getAttribute('value');
        setChoose(selectedValue || '');
    };

    return (
        <>
            <section className={styles.list__wrap}>
                <ul className={styles.list_elements}>
                    {data &&
                        data.map((item) => (
                            <li
                                onClick={onClick}
                                value={item.value}
                                className={`${styles.list_item} ${
                                    choose === item.value ? styles.selected : ''
                                }`}
                                key={item.id}
                                role="option"
                                aria-selected={choose === item.value}>
                                {item.title}
                            </li>
                        ))}
                </ul>
            </section>
        </>
    );
};
