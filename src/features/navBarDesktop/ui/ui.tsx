'use client';

import { NavBarLogo } from '@/entities/navBarLogo';
import styles from './ui.module.scss';
import { FC, useState, useEffect } from 'react';
import { NavBarElement, NavBarElementProps } from '@/entities/navBarElement';
import { middleSectionElements, lastSectionElements } from '../data';
export interface NavBarDesktopProps {}

export const NavBarDesktop: FC<NavBarDesktopProps> = () => {
    const [activeElementID, setActiveElementID] = useState<number>(0);
    const [middleSectionData, setMiddleSectionData] =
        useState<NavBarElementProps[]>(middleSectionElements);
    const [lastSectionData, setLastSectionData] =
        useState<NavBarElementProps[]>(lastSectionElements);

    useEffect(() => {
        setMiddleSectionData((middleSectionElements) =>
            middleSectionElements.map((element) =>
                element.id === activeElementID
                    ? { ...element, active: element.id }
                    : { ...element, active: null },
            ),
        );
        setLastSectionData((lastSectionElements) =>
            lastSectionElements.map((element) =>
                element.id === activeElementID
                    ? { ...element, active: element.id }
                    : { ...element, active: null },
            ),
        );
    }, [activeElementID]);

    return (
        <header className={styles.header}>
            <span className={styles.layout}>
                <section className={styles.section} style={{ paddingBottom: '12px' }}>
                    <NavBarLogo />
                </section>
                <section>
                    <nav>
                        <ul className={styles.navElements}>
                            {middleSectionData &&
                                middleSectionData.map((navBarElements: NavBarElementProps) => (
                                    <div
                                        onClick={() => setActiveElementID(navBarElements.id)}
                                        key={navBarElements.id}>
                                        <NavBarElement
                                            active={
                                                navBarElements.id === activeElementID
                                                    ? activeElementID
                                                    : null
                                            }
                                            id={navBarElements.id}
                                            title={navBarElements.title}
                                            link={navBarElements.link}
                                            icon={navBarElements.icon}
                                            elements={navBarElements.elements}
                                        />
                                    </div>
                                ))}
                        </ul>
                    </nav>
                </section>
            </span>
            <section>
                <nav>
                    <ul className={styles.navElements}>
                        {lastSectionData &&
                            lastSectionData.map((navBarElements: NavBarElementProps) => (
                                <div
                                    onClick={() => setActiveElementID(navBarElements.id)}
                                    key={navBarElements.id}>
                                    <NavBarElement
                                        active={
                                            navBarElements.id === activeElementID
                                                ? activeElementID
                                                : null
                                        }
                                        id={navBarElements.id}
                                        title={navBarElements.title}
                                        link={navBarElements.link}
                                        icon={navBarElements.icon}
                                        elements={navBarElements.elements}
                                    />
                                </div>
                            ))}
                    </ul>
                </nav>
            </section>
        </header>
    );
};
