'use client';

import {
    ThemeContext,
    ThemeFactory,
    Dropdown,
    MenuHeader,
    MenuItem,
    Button,
} from '@skbkontur/react-ui';
import styles from './ui.module.scss';
import { useState } from 'react';

export const DocumentInBoxHeader = () => {
    const [openForm, setOpenForm] = useState<string>('');

    const handleClick = (event: React.MouseEvent<HTMLSpanElement> | any) => {
        const spanElement = event.target as HTMLSpanElement;
        const value = spanElement.innerText;
        setOpenForm(openForm === value ? '' : value);
    };

    const myTheme = ThemeFactory.create({
        borderColorFocus: '#5A9C46',
        selectBorderRadiusLarge: '8px',
        menuItemHoverBg: '#5A9C46',
        btnBorderRadiusMedium: '8px',
        btnPrimaryBg: '#5A9C46',
        btnPrimaryHoverBg: '#449429',
        btnPrimaryActiveBg: '#5A9C46',
        btnDefaultBg: '#5A9C46',
        btnDefaultTextColor: '#fff',
        btnDefaultHoverBg: '#449429',
        btnDefaultActiveBg: '#449429',
        btnDefaultHoverBorderColor: 'transparent',
        btnDefaultActiveBorderColor: 'transparent',
        btnDefaultBorderColor: 'transparent',
        btnIconColor: '#fff',
    });

    const renderButton = (formName: string, label: string) => (
        <form key={formName}>
            <ThemeContext.Provider value={myTheme}>
                <Dropdown size="medium" caption={label}>
                    <MenuItem onClick={(e) => handleClick(e)}>Документы</MenuItem>
                    <MenuItem onClick={(e) => handleClick(e)}>Документы с подписями</MenuItem>
                    <MenuItem onClick={(e) => handleClick(e)}>Документообороты целиком</MenuItem>
                </Dropdown>
            </ThemeContext.Provider>
        </form>
    );

    return (
        <ThemeContext.Provider value={myTheme}>
            <section className={styles.layout}>
                <h1 className={styles.pageTitle}>Входящие</h1>
                <div className={styles.buttonLayout}>
                    {[
                        'download',
                        'subscribe',
                        'refuse',
                        'coordination',
                        'cancellation',
                        'print',
                    ].map((formName) => renderButton(formName, getLabelForForm(formName)))}
                    <Button borderless size="medium" use="primary">
                        Теги
                    </Button>
                </div>
            </section>
        </ThemeContext.Provider>
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

{
    /* <form key={formName}>
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
        */
}
