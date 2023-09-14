'use client';

import ArrowHistoryBtnHover from '../../../../public/buttonIcons/arrowHistoryHover.svg';
import Image from 'next/image';
import styles from './ui.module.scss';
import ArrowHistoryBtn from '../../../../public/buttonIcons/arrowHistory.svg';
import { useState } from 'react';
interface ButtonHistoryProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export const ButtonHistory = ({ onClick }: ButtonHistoryProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    return (
        <>
            <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={onClick}
                type="button"
                className={styles.btn_history}>
                <Image
                    src={isHovered ? ArrowHistoryBtnHover : ArrowHistoryBtn}
                    width={24}
                    height={24}
                    alt=""
                />{' '}
                Показать историю (1)
            </button>
        </>
    );
};
