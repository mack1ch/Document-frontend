'use client';
import { useState, useRef } from 'react';
import styles from './ui.module.scss';
import Image from 'next/image';
import DocumentMain from '../../../../public/img/document.svg';
import DocumentBtn from '../../../../public/buttonIcons/document.svg';
import { Gapped } from '@/shared/gapped';
import { Button, ThemeContext, ThemeFactory } from '@skbkontur/react-ui';
import { useRouter } from 'next/navigation';
export const DocumentNewImportDoc = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const router = useRouter();
    const [buttonLoading, setButtonLoading] = useState<{ [key: string]: boolean }>({
        button1: false,
        button2: false,
        button3: false,
        button4: false,
    });
    const filePicker = useRef<HTMLInputElement | null>(null);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handlePick = () => {
        if (filePicker.current) {
            filePicker.current.click();
        }
    };

    const handleButtonClick = (buttonName: string) => {
        setButtonLoading((prev) => ({ ...prev, [buttonName]: true }));
        if (buttonName === 'button1') {
            router.push('/docs/new/invoice');
        } else if (buttonName === 'button2') {
            router.push('/docs/new/nakladnaya');
        } else if (buttonName === 'button3') {
            router.push('/docs/new/acceptance-certificate');
        }
        handleLoadingStart(buttonName);
    };

    const handleLoadingStart = (buttonName: string) => {
        setTimeout(() => {
            setButtonLoading((prev) => ({ ...prev, [buttonName]: false }));
        }, 4000);
    };

    const myTheme = ThemeFactory.create({
        borderColorFocus: '#5A9C46',
        selectBorderRadiusLarge: '8px',
        menuItemHoverBg: '#5A9C46',
        btnBorderRadiusLarge: '8px',
        btnPrimaryBg: '#5A9C46',
        btnPrimaryHoverBg: '#449429',
        btnPrimaryActiveBg: '#5A9C46',
    });

    return (
        <>
            <ThemeContext.Provider value={myTheme}>
                <Gapped vertical gap="24px" className={styles.wrap}>
                    <main className={styles.layout}>
                        <dt onClick={handlePick} className={styles.description}>
                            <Image
                                placeholder="blur"
                                blurDataURL={'../../../../public/img/document.png'}
                                src={DocumentMain}
                                priority={true}
                                width={211}
                                height={184}
                                alt="Document"
                            />
                            <span className={styles.text}>
                                <span className={styles.specialText}>Загрузите с компьютера</span>{' '}
                                или перетащите файлы для отправки (максимум 30 документов)
                            </span>
                        </dt>
                        <input
                            className={styles.inputHidden}
                            type="file"
                            ref={filePicker}
                            onChange={handleChange}
                            accept="image/*"
                        />
                    </main>
                    <footer className={styles.footer}>
                        <h2 className={styles.h2}>Создать</h2>
                        <Gapped gap="16px">
                            <Gapped vertical>
                                <Button
                                    onClick={() => handleButtonClick('button1')}
                                    borderless
                                    loading={buttonLoading['button1']}
                                    use="default"
                                    size="large">
                                    Счет-фактуру
                                </Button>
                                <Button
                                    onClick={() => handleButtonClick('button2')}
                                    borderless
                                    loading={buttonLoading['button2']}
                                    use="default"
                                    size="large">
                                    Накладную
                                </Button>
                            </Gapped>
                            <Gapped vertical>
                                <Button
                                    onClick={() => handleButtonClick('button3')}
                                    borderless
                                    loading={buttonLoading['button3']}
                                    use="default"
                                    size="large">
                                    Акт приемки-сдачи работ
                                </Button>
                                <Button
                                    onClick={() => handleButtonClick('button4')}
                                    borderless
                                    loading={buttonLoading['button4']}
                                    use="default"
                                    size="large">
                                    УПД
                                </Button>
                            </Gapped>
                        </Gapped>
                    </footer>
                </Gapped>
            </ThemeContext.Provider>
        </>
    );
};
