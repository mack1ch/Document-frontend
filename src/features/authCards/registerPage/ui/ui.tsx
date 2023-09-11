'use client';

import styles from './ui.module.scss';
import { ThemeContext, ThemeFactory, Input, Select, Button } from '@skbkontur/react-ui';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
export const RegisterCard = () => {
    const [selectedValue, setSelectedValue] = useState();
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
    const router = useRouter();
    const [inputValues, setInputValues] = useState({
        fullName: '',
        email: '',
        password: '',
    });
    const myTheme = ThemeFactory.create({
        borderColorFocus: '#5A9C46',
        selectBorderRadiusLarge: '8px',
        menuItemHoverBg: '#5A9C46',
        btnBorderRadiusLarge: '8px',
        btnPrimaryBg: '#5A9C46',
        btnPrimaryHoverBg: '#449429',
        btnPrimaryActiveBg: '#5A9C46',
    });
    useEffect(() => {
        if (
            inputValues.fullName.length > 0 &&
            inputValues.email.length > 0 &&
            inputValues.password.length > 0 &&
            selectedValue
        ) {
            setButtonDisabled(false);
        } else setButtonDisabled(true);
    }, [
        inputValues.email.length,
        inputValues.fullName.length,
        inputValues.password.length,
        selectedValue,
    ]);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleLoadingStart = () => {
        setTimeout(() => {
            setButtonLoading(false);
        }, 4000);
    };

    const handleButtonClick = () => {
        setButtonLoading(true);
        router.push('/docs/new');
        handleLoadingStart();
    };

    const items = ['Сотрудник', 'Юрист', 'Делопроизводитель', 'Генеральный директор'];
    return (
        <>
            <ThemeContext.Provider value={myTheme}>
                <div className={styles.wrap}>
                    <header className={styles.header}>
                        <dl className={styles.logo}>
                            <span className={styles.inverse}>Inverse </span>
                            <span className={styles.docs}>Документы</span>
                        </dl>
                        <span className={styles.user__data}>Персональные данные</span>
                    </header>
                    <main className={styles.main}>
                        <Input
                            style={{ borderRadius: '8px', width: '100%' }}
                            placeholder="ФИО"
                            value={inputValues.fullName}
                            size="large"
                            onChange={handleInputChange}
                            name="fullName"
                        />
                        <Input
                            style={{ borderRadius: '8px', width: '100%' }}
                            placeholder="Почта"
                            value={inputValues.email}
                            size="large"
                            onChange={handleInputChange}
                            name="email"
                        />
                        <Input
                            style={{ borderRadius: '8px', width: '100%' }}
                            placeholder="Пароль"
                            value={inputValues.password}
                            size="large"
                            type="password"
                            onChange={handleInputChange}
                            name="password"
                        />
                        <Select
                            size="large"
                            placeholder="Роль"
                            style={{ borderRadius: '8px', width: '100%' }}
                            items={items}
                            value={selectedValue}
                            onValueChange={setSelectedValue}
                        />
                    </main>
                    <footer>
                        <Button
                            width="100%"
                            style={{ color: '#fff' }}
                            loading={buttonLoading}
                            onClick={handleButtonClick}
                            disabled={buttonDisabled}
                            size="large"
                            borderless
                            use="primary">
                            Дальше
                        </Button>
                    </footer>
                </div>
            </ThemeContext.Provider>
        </>
    );
};
