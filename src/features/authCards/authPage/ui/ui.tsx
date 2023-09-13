'use client';

import styles from './ui.module.scss';
import { ThemeContext, ThemeFactory, Input, Button } from '@skbkontur/react-ui';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from '@/shared/api/setCookie';
import { instance } from '@/shared/api/axios';
export const AuthCard = () => {
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
    const router = useRouter();
    const [inputValues, setInputValues] = useState({
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
        if (inputValues.email.length > 0 && inputValues.password.length > 0) {
            setButtonDisabled(false);
        } else setButtonDisabled(true);
    }, [inputValues.email.length, inputValues.password.length]);

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

    const handleButtonClick = async () => {
        setButtonLoading(true);
        try {
            const loginUser = await instance.post('/users/auth/token/login/', {
                email: inputValues.email,
                password: inputValues.password,
            });

            setCookie('accessToken', loginUser.data.auth_token, { expires: 30, path: '/' });
            router.push('/docs/new');
            handleLoadingStart();
        } catch (e) {
            alert('Данные введены неверно или пользователя не существует');
            setButtonLoading(false);
        }
    };

    return (
        <>
            <ThemeContext.Provider value={myTheme}>
                <div className={styles.wrap}>
                    <header className={styles.header}>
                        <dl className={styles.logo}>
                            <span className={styles.inverse}>Inverse </span>
                            <span className={styles.docs}>Документы</span>
                        </dl>
                    </header>
                    <main className={styles.main}>
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
                            Войти
                        </Button>
                    </footer>
                </div>
            </ThemeContext.Provider>
        </>
    );
};
