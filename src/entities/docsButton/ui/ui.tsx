'use client';

import Image from 'next/image';
import styles from './ui.module.scss';
import { useState } from 'react';
import { ButtonDocsProps } from '@/shared/interface';

export const DocsButton = ({ onClick, icon, iconHover, danger, children }: ButtonDocsProps) => {
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
                style={{ color: isHovered && danger ? '#ED5656' : undefined }}
                className={styles.btn_history}>
                <Image src={isHovered ? iconHover : icon} width={24} height={24} alt="" />
                {children}
            </button>
        </>
    );
};
