'use client';

import styles from './ui.module.scss';
import { useState, useEffect } from 'react';
import { Input } from '@skbkontur/react-ui';
import { Gapped } from '@/shared/gapped';
import { ThemeContext, ThemeFactory, Button, Modal, Textarea, Select } from '@skbkontur/react-ui';
import { useRouter } from 'next/navigation';
import Plus from '../../../../../public/buttonIcons/plus.svg';
import X from '../../../../../public/globalIcons/x.svg';
import { instanceLogged } from '@/shared/api/axios';
import Image from 'next/image';
import { Contractors, UserTypes } from '@/shared/interface';
import { getAccessToken } from '@/shared/authBlocks/auth';

const RECIEVERS_URL = 'https://docs.inverse-team.store/api/documents/statuses/1/recievers/';

export const InvoiceCreate = () => {
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
    const [selectedValue, setSelectedValue] = useState();
    const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
    const [items, setItems] = useState<string[]>([]);
    const [dataItem, setDataItem] = useState<any>(null);
    //const [commentValue, setCommentValue] = useState<string>('');
    const [inputValues, setInputValues] = useState({
        salesman_INN: '',
        salesman_KPP: '',
        shipper_INN: '',
        shipper_KPP: '',
        consignee_INN: '',
        consignee_KPP: '',
        invoice_number: '',
        invoice_date: '',
    });
    const [buttonModalLoading, setButtonModalLoading] = useState<boolean>(false);
    const [buttonModalDisabled, setButtonModalDisabled] = useState<boolean>(true);
    const [buttonCancelLoading, setButtonCancelLoading] = useState<boolean>(false);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
    const [sellerSaveData, setSellerData] = useState<Contractors | null | string>(null);
    const [shipperSaveData, setShipperData] = useState<Contractors | null | string>(null);
    const [consigneeSaveData, seеСonsigneeData] = useState<Contractors | null | string>(null);

    const LineWrap: React.FC<LineWrapProps> = ({ index, data, saveData }) => {
        const SelectItems = ['Без НДС', '10%', '20%'];
        const [stateData, setStateData] = useState<{
            name?: string;
            quantity?: string;
            unit?: string;
            price?: string;
            vat?: string;
            total_price?: number;
        }>(data || {});
        const handleChange = (fieldName: string, value: string) => {
            setStateData((prevData) => {
                const updatedData = {
                    ...prevData,
                    [fieldName]: value,
                };

                if (fieldName === 'quantity' || fieldName === 'vat') {
                    const quantity = parseFloat(updatedData['quantity'] || '0');
                    const price = parseFloat(updatedData['price'] || '0');
                    const vatPercentage = parseFloat(updatedData['vat'] || '0');

                    updatedData['total_price'] = quantity * price * (1 + vatPercentage / 100);
                }
                saveData(index, updatedData);

                console.log(1);
                return updatedData;
            });
        };

        return (
            <dl className={styles.line__wrap}>
                <dt className={styles.line}>
                    <span className={styles.line__text}>Название</span>
                    <Input
                        value={stateData['name'] || ''}
                        onChange={(event) => handleChange('name', event.target.value)}
                        placeholder="Текст"
                    />
                </dt>
                <dt className={styles.line}>
                    <span className={styles.line__text}>Кол-во</span>
                    <Input
                        value={stateData['quantity'] || ''}
                        onChange={(event) => handleChange('quantity', event.target.value)}
                        style={{ width: '80px' }}
                        type="number"
                        placeholder="Число"
                    />
                </dt>
                <dt className={styles.line}>
                    <span className={styles.line__text}>Ед. изм.</span>
                    <Input
                        value={stateData['unit'] || ''}
                        onChange={(event) => handleChange('unit', event.target.value)}
                        style={{ width: '80px' }}
                        placeholder="Текст"
                    />
                </dt>
                <dt className={styles.line}>
                    <span className={styles.line__text}>Цена, ₽</span>
                    <Input
                        value={stateData['price'] || ''}
                        onChange={(event) => handleChange('price', event.target.value)}
                        style={{ width: '80px' }}
                        placeholder="Число"
                        type="number"
                    />
                </dt>
                <dt className={styles.line}>
                    <span className={styles.line__text}>В т.ч. НДС</span>
                    <Select
                        onValueChange={(value) => handleChange('vat', value)}
                        defaultValue={stateData['vat'] || 'Без НДС'}
                        items={SelectItems}
                        placeholder="Число"
                    />
                </dt>
            </dl>
        );
    };
    const findRoleIdByName = (roleName: string): number | null => {
        const [lastname, firstname, surname] = splitFullName(roleName);
        const role = dataItem?.find((item: any) => item.lastname === lastname);
        return role ? role.id : null;
    };
    const ModalOpen = async () => {
        setModalOpen(true);
    };

    const splitFullName = (fullName: string) => {
        const names = fullName.split(' ');
        const [firstName, surname, thirdName] = names.slice(0, 3);
        return [firstName || '', surname || '', thirdName || ''];
    };

    function ModalClose() {
        setModalOpen(false);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instanceLogged.get(RECIEVERS_URL);
                const data = response.data;

                const FULLNAME = data.map(
                    (item: any) => item.lastname + ' ' + item.firstname + ' ' + item.surname,
                );
                setDataItem(data);
                setItems(FULLNAME);
            } catch (error) {
                return error;
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedValue) {
            const roleId = findRoleIdByName(selectedValue);
            setSelectedRoleId(roleId);
        } else {
            setSelectedRoleId(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedValue]);
    /**
 * "payer": 1,
            "seller": 1,
            "shipper": 1,
            "provider": 1,
            "consignee": 1
 */
    const handleButtonClick = async () => {
        setButtonModalLoading(true);
        readyState: 4;
        response: '{"category":{"non_field_errors":["Недопустимые данные. Ожидался dictionary, но был получен int."]},"main_contractor":{"non_field_errors":["Недопустимые данные. Ожидался dictionary, но был получен int."]},"contractors":[{"non_field_errors":["Недопустимые данные. Ожидался dictionary, но был получен int."]},{"non_field_errors":["Недопустимые данные. Ожидался dictionary, но был получен int."]},{"non_field_errors":["Недопустимые данные. Ожидался dictionary, но был получен int."]}],"recievers":["Ожидался list со значениями, но был получен \\"int\\"."]}';
        responseText: '{"category":{"non_field_errors":["Недопустимые данные. Ожидался dictionary, но был получен int."]},"main_contractor":{"non_field_errors":["Недопустимые данные. Ожидался dictionary, но был получен int."]},"contractors":[{"non_field_errors":["Недопустимые данные. Ожидался dictionary, но был получен int."]},{"non_field_errors":["Недопустимые данные. Ожидался dictionary, но был получен int."]},{"non_field_errors":["Недопустимые данные. Ожидался dictionary, но был получен int."]}],"recievers":["Ожидался list со значениями, но был получен \\"int\\"."]}';

        try {
            const mC = typeof sellerSaveData === 'string' ? sellerSaveData : sellerSaveData?.id;
            const mC_name =
                typeof sellerSaveData === 'string' ? sellerSaveData : sellerSaveData?.name;
            const sC = typeof shipperSaveData === 'string' ? shipperSaveData : shipperSaveData?.id;
            const cC =
                typeof consigneeSaveData === 'string' ? consigneeSaveData : consigneeSaveData?.id;
            const response = await instanceLogged.post('/documents/create/', {
                number: inputValues.invoice_number,
                date: inputValues.invoice_date,
                category: 1,
                main_contractor: mC,
                contractors: [mC, sC, cC],
                contractors_categories: {
                    seller: mC,
                    shipper: sC,
                    consignee: cC,
                },
                products: [2],
                recievers: [selectedRoleId],
            });

            console.log('Успешный ответ', response.data);
            router.push('/docs/new');
            handleLoadingStart();
        } catch (error) {
            console.error('Ошибка при отправке POST-запроса', error);
            setButtonModalLoading(false);
        }
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
                                value={selectedValue}
                                items={items}
                                placeholder="Выберите отправителя"
                                onValueChange={setSelectedValue}
                                style={{ borderRadius: '8px', width: '100%' }}
                            />
                            {/*  <Textarea
                                value={commentValue}
                                onValueChange={setCommentValue}
                                autoResize
                                placeholder="Комментарий для получателя"
                                style={{ borderRadius: '8px', width: '100%' }}
                            />*/}
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

    const ProductCreation = () => {
        const [blocks, setBlocks] = useState<Array<JSX.Element>>([<LineWrap index={0} key={0} />]);
        const removeBlock = (index: number) => {
            const updatedBlocks = blocks.filter((_, i) => i !== index);
            setBlocks(updatedBlocks);
        };

        const addBlock = () => {
            setBlocks([...blocks, <LineWrap key={blocks.length} index={blocks.length} />]);
        };

        const saveData = (index: number, data: object) => {
            const updatedBlocks = blocks.map((block, i) => {
                if (i === index) {
                    return <LineWrap index={i} key={i} data={data} saveData={saveData} />;
                }
                return block;
            });
            setBlocks(updatedBlocks);
        };

        const getTotalPrice = () => {
            let total = 0;
            blocks.forEach((block) => {
                const blockData = block.props.data || {};
                const total_price = blockData.total_price || 0;
                total += parseFloat(total_price);
            });

            return total.toFixed(2);
        };

        return (
            <>
                <div className={styles.layout}>
                    <h2 className={styles.title}>Товары и услуги</h2>
                    {blocks.map((block, index) => (
                        <div className={styles.line__wrap} key={index}>
                            <LineWrap index={index} data={block} saveData={saveData} />{' '}
                            {index >= 1 ? (
                                <Image
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => removeBlock(index)}
                                    src={X}
                                    width={24}
                                    height={24}
                                    alt="delete"
                                />
                            ) : undefined}
                        </div>
                    ))}
                </div>

                <button className={styles.addButton} onClick={addBlock}>
                    <Image src={Plus} width={16} height={16} alt="" />
                    Добавить товар или услугу
                </button>
                <div className={styles.totalPrice}>Всего к оплате: {getTotalPrice()} рублей</div>
            </>
        );
    };

    useEffect(() => {
        if (
            inputValues.consignee_INN.length > 0 &&
            inputValues.consignee_KPP.length > 0 &&
            inputValues.salesman_INN.length > 0 &&
            inputValues.salesman_KPP.length > 0 &&
            inputValues.shipper_INN.length > 0 &&
            inputValues.shipper_KPP.length > 0 &&
            inputValues.invoice_date.length > 0 &&
            inputValues.invoice_number.length > 0
        ) {
            setButtonDisabled(false);
        } else setButtonDisabled(true);
    }, [
        inputValues.consignee_INN.length,
        inputValues.consignee_KPP.length,
        inputValues.invoice_date.length,
        inputValues.invoice_number.length,
        inputValues.salesman_INN.length,
        inputValues.salesman_KPP.length,
        inputValues.shipper_INN.length,
        inputValues.shipper_KPP.length,
    ]);
    useEffect(() => {
        if (selectedValue) {
            setButtonModalDisabled(false);
        } else setButtonModalDisabled(true);
    }, [selectedValue]);

    const renderSeller = async () => {
        try {
            const accessToken = getAccessToken();
            const sellerData = await fetch(
                `https://docs.inverse-team.store/api/documents/contractors/inn/${inputValues.salesman_INN}/`,
                {
                    headers: {
                        Authorization: `Token ${accessToken}`,
                    },
                },
            );
            const jsonData = await sellerData.json();
            setSellerData(jsonData);
        } catch (e) {
            setSellerData('Проверьте введенные данные ИНН, в них есть ошибка');
        }
    };
    const handleInputSellerBlur = () => {
        renderSeller();
    };

    const shipperSeller = async () => {
        try {
            const accessToken = getAccessToken();
            const sellerData = await fetch(
                `https://docs.inverse-team.store/api/documents/contractors/inn/${inputValues.salesman_INN}/`,
                {
                    headers: {
                        Authorization: `Token ${accessToken}`,
                    },
                },
            );
            const jsonData = await sellerData.json();
            setShipperData(jsonData);
        } catch (e) {
            setShipperData('Проверьте введенные данные ИНН, в них есть ошибка');
        }
    };
    const handleInputShipperBlur = () => {
        shipperSeller();
    };
    const СonsigneeSeller = async () => {
        try {
            const accessToken = getAccessToken();
            const sellerData = await fetch(
                `https://docs.inverse-team.store/api/documents/contractors/inn/${inputValues.salesman_INN}/`,
                {
                    headers: {
                        Authorization: `Token ${accessToken}`,
                    },
                },
            );
            const jsonData = await sellerData.json();
            seеСonsigneeData(jsonData);
        } catch (e) {
            seеСonsigneeData('Проверьте введенные данные ИНН, в них есть ошибка');
        }
    };
    const handleInputСonsigneeBlur = () => {
        СonsigneeSeller();
    };

    return (
        <>
            <ThemeContext.Provider value={myTheme}>
                {modalOpen && renderModal()}
                <main className={styles.layout}>
                    <div className={styles.card}>
                        <dl className={styles.line}>
                            <span className={styles.line__title}>Счет фактура №</span>
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
                                <h3 className={styles.table__line_title}>Продавец</h3>
                                <dt className={styles.line}>
                                    <span className={styles.line__title}>ИНН</span>
                                    <Input
                                        onChange={handleInputChange}
                                        name="salesman_INN"
                                        onBlur={handleInputSellerBlur}
                                        value={inputValues.salesman_INN}
                                        placeholder="Текст"
                                        type="number"
                                    />
                                </dt>
                                <dt className={styles.line}>
                                    <span className={styles.line__title}>КПП</span>
                                    <Input
                                        onChange={handleInputChange}
                                        name="salesman_KPP"
                                        value={inputValues.salesman_KPP}
                                        placeholder="Текст"
                                        type="number"
                                    />
                                </dt>
                            </div>
                            <div className={styles.table__line}>
                                <h3 className={styles.table__line_title}>Грузоотправитель</h3>
                                <dt className={styles.line}>
                                    <span className={styles.line__title}>ИНН</span>
                                    <Input
                                        onChange={handleInputChange}
                                        onBlur={handleInputShipperBlur}
                                        value={inputValues.shipper_INN}
                                        name="shipper_INN"
                                        placeholder="Текст"
                                        type="number"
                                    />
                                </dt>
                                <dt className={styles.line}>
                                    <span className={styles.line__title}>КПП</span>
                                    <Input
                                        onChange={handleInputChange}
                                        name="shipper_KPP"
                                        value={inputValues.shipper_KPP}
                                        placeholder="Текст"
                                        type="number"
                                    />
                                </dt>
                            </div>
                            <div className={styles.table__line}>
                                <h3 className={styles.table__line_title}>Грузополучатель</h3>
                                <dt className={styles.line}>
                                    <span className={styles.line__title}>ИНН</span>
                                    <Input
                                        onChange={handleInputChange}
                                        onBlur={handleInputСonsigneeBlur}
                                        value={inputValues.consignee_INN}
                                        name="consignee_INN"
                                        placeholder="Текст"
                                        type="number"
                                    />
                                </dt>
                                <dt className={styles.line}>
                                    <span className={styles.line__title}>КПП</span>
                                    <Input
                                        onChange={handleInputChange}
                                        name="consignee_KPP"
                                        value={inputValues.consignee_KPP}
                                        placeholder="Текст"
                                        type="number"
                                    />
                                </dt>
                            </div>
                        </dl>
                        <dl className={styles.data__wrap}>
                            <div className={styles.data__line}>
                                <h3 className={styles.line__title}>Продавец:</h3>
                                <span className={styles.data}>
                                    {' '}
                                    {typeof sellerSaveData === 'string'
                                        ? sellerSaveData
                                        : sellerSaveData?.name}
                                </span>
                            </div>
                            <div className={styles.data__line}>
                                <h3 className={styles.line__title}>Адрес:</h3>
                                <span className={styles.data}>
                                    {typeof sellerSaveData === 'string'
                                        ? sellerSaveData
                                        : sellerSaveData?.address}
                                </span>
                            </div>
                            <div className={styles.data__line}>
                                <h3 className={styles.line__title}>
                                    Грузоотправитель и его адрес:
                                </h3>
                                <span className={styles.data}>
                                    {typeof shipperSaveData === 'string'
                                        ? shipperSaveData
                                        : shipperSaveData?.name}{' '}
                                    {typeof shipperSaveData === 'string'
                                        ? shipperSaveData
                                        : shipperSaveData?.address}
                                </span>
                            </div>
                            <div className={styles.data__line}>
                                <h3 className={styles.line__title}>Грузополучатель и его адрес:</h3>
                                <span className={styles.data}>
                                    {typeof consigneeSaveData === 'string'
                                        ? consigneeSaveData
                                        : consigneeSaveData?.name}{' '}
                                    {typeof consigneeSaveData === 'string'
                                        ? consigneeSaveData
                                        : consigneeSaveData?.address}
                                </span>
                            </div>
                        </dl>
                        <ProductCreation />
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

type LineWrapProps = {
    index: number;
    data?: object;
    saveData?: any;
    setProducts?: any;
};

export interface Data {
    name?: string;
    quantity?: string;
    unit?: string;
    price?: string;
    vat?: string;
    total_price?: number;
}
