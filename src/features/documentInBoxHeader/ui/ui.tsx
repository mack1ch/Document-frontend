'use client';

import { Button } from '@/entities/button';
import styles from './ui.module.scss';
import { useState } from 'react';
import Arrow from '../../../../public/buttonIcons/arrowDropDown.svg';
import { ButtonDropDownList } from '@/entities/buttonDropDownList';

export const DocumentInBoxHeader = () => {
    const [openForm, setOpenForm] = useState<string>('');

    const handleButtonClick = (formName: string) => {
        setOpenForm(openForm === formName ? '' : formName);
    };

    const renderButton = (formName: string, label: string) => (
        <form key={formName}>
            <Button
                style={{
                    flexDirection: 'row-reverse',
                    padding: '9px 16px',
                    marginLeft: formName === 'refuse' ? '-16px' : undefined,
                    borderRadius:
                        formName === 'refuse'
                            ? '0px 8px 8px 0px'
                            : formName === 'subscribe'
                            ? '8px 0px 0px 8px'
                            : '8px',
                    borderLeft: formName === 'refuse' ? '1px solid rgba(0, 0, 0, 0.16)' : 'none',
                }}
                borderless
                icon={formName === 'subscribe' ? null : Arrow}
                size="medium"
                use="custom"
                onClick={() => handleButtonClick(formName)}
                bgColor="#5A9C46">
                {label}
            </Button>
            {openForm === 'subscribe' ? null : openForm === formName && <ButtonDropDownList />}
        </form>
    );

    return (
        <section className={styles.layout}>
            <h1 className={styles.pageTitle}>Входящие</h1>
            <div className={styles.buttonLayout}>
                {['download', 'subscribe', 'refuse', 'coordination', 'cancellation', 'print'].map(
                    (formName) => renderButton(formName, getLabelForForm(formName)),
                )}
                <Button borderless size="medium" use="custom" bgColor="#5A9C46">
                    Теги
                </Button>
            </div>
        </section>
    );
};



const getLabelForForm = (formName: string): string => {
    switch (formName) {
        case 'download':
            return 'Скачать';
        case 'subscribe':
            return 'Подписать';
        case 'refuse':
            return 'Отказать';
        case 'coordination':
            return 'Согласование';
        case 'cancellation':
            return 'Аннулирование';
        case 'print':
            return 'Печатать';
        default:
            return '';
    }
};
