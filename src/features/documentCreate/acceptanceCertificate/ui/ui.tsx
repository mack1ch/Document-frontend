/*'use client';

import styles from './ui.module.scss';
import { useState, useEffect } from 'react';
import { Input } from '@skbkontur/react-ui';
import { Gapped } from '@/shared/gapped';
import { ThemeContext, ThemeFactory, Button, Modal, Textarea, Select } from '@skbkontur/react-ui';
import { useRouter } from 'next/navigation';
import { ProductCreation } from '@/features/productCreation';
export const AcceptanceCertificateCreate = () => {
    const myTheme = ThemeFactory.create({
        borderColorFocus: '#5A9C46',
        selectBorderRadiusLarge: '8px',
        menuItemHoverBg: '#5A9C46',
        btnBorderRadiusMedium: '8px',
        btnPrimaryBg: '#1B322B',
        btnPrimaryHoverBg: '#222',
        textareaBorderRadius: '8px',
        btnPrimaryActiveBg: '#1B322B',
        modalHeaderFontWeight: '600',
        modalBorderRadius: '8px',
    });
    const modalTheme = ThemeFactory.create({
        btnPrimaryBg: '#5A9C46',
        btnPrimaryHoverBg: '#449429',
        btnPrimaryActiveBg: '#5A9C46',
        btnBorderRadiusMedium: '8px',
    });
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectRecipient, setSelectRecipient] = useState();
    const [commentValue, setCommentValue] = useState<string>('');
    const [inputValues, setInputValues] = useState({
        customer_INN: '',
        executor_INN: '',
        executor_KPP: '',
        customer_KPP: '',
        shipper_INN: '',
        invoice_number: '',
        invoice_date: '',
    });
    const [buttonModalLoading, setButtonModalLoading] = useState<boolean>(false);
    const [buttonModalDisabled, setButtonModalDisabled] = useState<boolean>(true);
    const [buttonCancelLoading, setButtonCancelLoading] = useState<boolean>(false);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
    function ModalOpen() {
        setModalOpen(true);
    }

    function ModalClose() {
        setModalOpen(false);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name, value);
        setInputValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleLoadingStart = () => {
        setTimeout(() => {
            setButtonModalLoading(false);
        }, 4000);
    };

    const handleButtonClick = () => {
        setButtonModalLoading(true);
        router.push('/docs/new');
        handleLoadingStart();
    };

    const handleCancelLoadingStart = () => {
        setTimeout(() => {
            setButtonCancelLoading(false);
        }, 4000);
    };
    const handleCancelButtonClick = () => {
        setButtonCancelLoading(true);
        router.push('/docs/new');
        handleCancelLoadingStart();
    };

    function renderModal() {
        return (
            <ThemeContext.Provider value={myTheme}>
                <Modal className={styles.modal} width="512px" onClose={ModalClose}>
                    <Modal.Header className={styles.modal__header}>Отправка документа</Modal.Header>
                    <Modal.Body>
                        <Gapped vertical gap="16px">
                            <Select
                                size="medium"
                                value={selectRecipient}
                                onValueChange={setSelectRecipient}
                                placeholder="Получатель"
                                style={{ borderRadius: '8px', width: '100%' }}
                            />
                            <Textarea
                                value={commentValue}
                                onValueChange={setCommentValue}
                                placeholder="Комментарий для получателя"
                                style={{ borderRadius: '8px', width: '100%' }}
                            />
                            <dl className={styles.modal__text}>
                                <h4 className={styles.text}>
                                    <span className={styles.bold}>Подписант:</span> Иванов А. А.{' '}
                                </h4>
                                <h4 className={styles.text}>
                                    <span className={styles.bold}>Полномочия:</span> Лицо,
                                    ответственное за оформление свершившегося события и за
                                    подписание счетов-фактур .{' '}
                                </h4>
                            </dl>
                            <span className={styles.divider}></span>
                        </Gapped>
                    </Modal.Body>
                    <Modal.Footer>
                        <Gapped>
                            <ThemeContext.Provider value={modalTheme}>
                                <Button
                                    onClick={handleButtonClick}
                                    loading={buttonModalLoading}
                                    disabled={buttonModalDisabled}
                                    borderless
                                    size="medium"
                                    use="primary">
                                    Отправить
                                </Button>
                                <Button onClick={ModalClose} size="medium">
                                    Отменить
                                </Button>
                            </ThemeContext.Provider>
                        </Gapped>
                    </Modal.Footer>
                </Modal>
            </ThemeContext.Provider>
        );
    }

    useEffect(() => {
        if (
            inputValues.executor_INN.length > 0 &&
            inputValues.executor_KPP.length > 0 &&
            inputValues.customer_INN.length > 0 &&
            inputValues.customer_KPP.length > 0 &&
            inputValues.invoice_date.length > 0 &&
            inputValues.invoice_number.length > 0
        ) {
            setButtonDisabled(false);
        } else setButtonDisabled(true);
    }, [
        inputValues.executor_INN.length,
        inputValues.executor_KPP.length,
        inputValues.invoice_date.length,
        inputValues.invoice_number.length,
        inputValues.customer_INN.length,
        inputValues.customer_KPP.length,
    ]);
    useEffect(() => {
        if (commentValue.length > 0 && selectRecipient) {
            setButtonModalDisabled(false);
        } else setButtonModalDisabled(true);
    }, [commentValue.length, selectRecipient]);
    return (
        <>
            <ThemeContext.Provider value={myTheme}>
                {modalOpen && renderModal()}
                <main className={styles.layout}>
                    <div className={styles.card}>
                        <dl className={styles.line}>
                            <span className={styles.line__title}>Акта сдачи приемки №</span>
                            <Input
                                onChange={handleInputChange}
                                name="invoice_number"
                                value={inputValues.invoice_number}
                                type="number"
                                placeholder="№"
                                style={{ width: '96px' }}
                            />
                            <span className={styles.line__title}>от</span>
                            <Input
                                onChange={handleInputChange}
                                value={inputValues.invoice_date}
                                name="invoice_date"
                                type="date"
                            />
                        </dl>
                        <dl className={styles.table}>
                            <div className={styles.table__line}>
                                <h3 className={styles.table__line_title}>Заказчик</h3>
                                <dt className={styles.line}>
                                    <span className={styles.line__title}>ИНН</span>
                                    <Input
                                        onChange={handleInputChange}
                                        name="customer_INN"
                                        value={inputValues.customer_INN}
                                        placeholder="Текст"
                                        type="number"
                                    />
                                </dt>
                                <dt className={styles.line}>
                                    <span className={styles.line__title}>КПП</span>
                                    <Input
                                        onChange={handleInputChange}
                                        name="customer_KPP"
                                        value={inputValues.customer_KPP}
                                        placeholder="Текст"
                                        type="number"
                                    />
                                </dt>
                            </div>
                            <div className={styles.table__line}>
                                <h3 className={styles.table__line_title}>Исполнитель</h3>
                                <dt className={styles.line}>
                                    <span className={styles.line__title}>ИНН</span>
                                    <Input
                                        onChange={handleInputChange}
                                        name="executor_INN"
                                        value={inputValues.executor_INN}
                                        placeholder="Текст"
                                        type="number"
                                    />
                                </dt>
                                <dt className={styles.line}>
                                    <span className={styles.line__title}>КПП</span>
                                    <Input
                                        onChange={handleInputChange}
                                        name="executor_KPP"
                                        value={inputValues.executor_KPP}
                                        placeholder="Текст"
                                        type="number"
                                    />
                                </dt>
                            </div>
                        </dl>
                        <dl className={styles.data__wrap}>
                            <div className={styles.data__line}>
                                <h3 className={styles.line__title}>Заказчик и его адрес:</h3>
                                <span className={styles.data}>
                                    Фармдистрибьютор “Гигант” 620014, Свердловская область,
                                    Екатеринбург, Шейнкмана, 73
                                </span>
                            </div>
                            <div className={styles.data__line}>
                                <h3 className={styles.line__title}>Исполнитель и его адрес:</h3>
                                <span className={styles.data}>
                                    Фармдистрибьютор “Гигант” 620014, Свердловская область,
                                    Екатеринбург, Шейнкмана, 73
                                </span>
                            </div>
                        </dl>
                        <ProductCreation />
                        <h4 className={styles.money__result}>Всего к оплате: 110.00 рублей</h4>
                    </div>
                    <div style={{ marginBottom: '32px' }} className={styles.buttons}>
                        <Button
                            disabled={buttonDisabled}
                            onClick={ModalOpen}
                            borderless
                            size="medium"
                            use="primary">
                            Перейти к отправке
                        </Button>
                        <Button
                            loading={buttonCancelLoading}
                            onClick={handleCancelButtonClick}
                            size="medium">
                            Отменить
                        </Button>
                    </div>
                </main>
            </ThemeContext.Provider>
        </>
    );
};
*/