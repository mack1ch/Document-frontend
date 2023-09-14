'use client';

import { ThemeContext, ThemeFactory } from '@skbkontur/react-ui';
import styles from './ui.module.scss';
import Image from 'next/image';
import ArrowLeft from '../../../../public/globalIcons/arrowLeft.svg';
import { ButtonHistory } from '@/entities/buttonHistory';
import { DocsButton } from '@/entities/docsButton';
import { ButtonDataNoAgreedNoSigned } from '../buttonData';
import { ButtonDocsProps } from '@/shared/interface';
import { useState, useEffect } from 'react';
import { DocumentTypes } from '@/shared/interface';
import { instanceLogged } from '@/shared/api/axios';
import { useRouter } from 'next/navigation';
import {
    convertFirstLetterToLowerCase,
    formattedDate,
    formatNumberWithDecimalSeparator,
} from '../model';
export const Document = ({ docID }: { docID: number }) => {
    const BASE_URL = `https://docs.inverse-team.store/api/documents/${docID}/`;
    const myTheme = ThemeFactory.create({
        btnBorderRadiusSmall: '8px',
        btnTextTextColor: '#74757A',
    });
    const [documentData, setDocumentData] = useState<DocumentTypes | null>(null);
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instanceLogged.get(BASE_URL);
                setDocumentData(response.data);
            } catch (error) {
                return;
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (
        !documentData ||
        !documentData.contractors_categories ||
        typeof documentData.contractors_categories.payer !== 'number'
    ) {
        return <div>Подождите немного...</div>;
    }

    const payerId = documentData.contractors_categories.payer;
    const payerContractor = documentData.contractors.find(
        (contractor: any) => contractor.id === payerId,
    );
    const sellerId = documentData.contractors_categories.seller;
    const sellerContractor = documentData.contractors.find(
        (contractor: any) => contractor.id === sellerId,
    );
    const shipperId = documentData.contractors_categories.shipper;
    const shipperContractor = documentData.contractors.find(
        (contractor: any) => contractor.id === shipperId,
    );

    const consigneeId = documentData.contractors_categories.consignee;
    const consigneeContractor = documentData.contractors.find(
        (contractor: any) => contractor.id === consigneeId,
    );

    if (!payerContractor) {
        return <div>Подождите немного...</div>;
    }

    return (
        <>
            <ThemeContext.Provider value={myTheme}>
                <div className={styles.page}>
                    <header className={styles.header}>
                        <section className={styles.document_main_wrap}>
                            <span
                                style={{
                                    display: 'flex',
                                    gap: '16px',
                                    alignItems: 'center',
                                    marginLeft: '-40px',
                                }}>
                                <Image
                                    onClick={() => router.back()}
                                    className={styles.btnBack}
                                    src={ArrowLeft}
                                    width={24}
                                    height={24}
                                    alt="goBack"
                                />
                                <h1 className={styles.document_title}>
                                    Входящий{' '}
                                    {documentData?.category
                                        ? convertFirstLetterToLowerCase(documentData?.category.name)
                                        : undefined}{' '}
                                    №{documentData?.number} от{' '}
                                    {documentData?.date
                                        ? formattedDate(documentData?.date)
                                        : undefined}
                                </h1>
                            </span>
                            <h3 className={styles.price}>
                                {documentData?.total_price
                                    ? formatNumberWithDecimalSeparator(documentData?.total_price)
                                    : undefined}{' '}
                                ₽,{' '}
                                <span className={styles.NDS}>
                                    НДС:{' '}
                                    {documentData?.total_nds
                                        ? formatNumberWithDecimalSeparator(documentData?.total_nds)
                                        : undefined}{' '}
                                    ₽
                                </span>
                            </h3>
                        </section>
                        <section className={styles.history_wrap}>
                            <ButtonHistory />
                        </section>
                        <section className={styles.buttonRender}>
                            {ButtonDataNoAgreedNoSigned.map((data: ButtonDocsProps) => (
                                <DocsButton
                                    danger={data.danger}
                                    icon={data.icon}
                                    iconHover={data.iconHover}
                                    key={data.id}>
                                    {data.children}
                                </DocsButton>
                            ))}
                        </section>
                    </header>
                    <main className={styles.main}>
                        <div className={styles.list}>
                            <section className={styles.list__header}>
                                <span className={styles.document__main__info}>
                                    <h3 className={styles.document_info_title}>
                                        {documentData?.category
                                            ? documentData?.category.name
                                            : undefined}{' '}
                                        №{documentData?.number} от{' '}
                                        {documentData?.date
                                            ? formattedDate(documentData?.date)
                                            : undefined}
                                    </h3>
                                    <p className={styles.document_info_text}>
                                        Исправление № - от -
                                    </p>
                                </span>
                                <p className={styles.comment}>
                                    Приложение №1 <br /> к постановлению Правительства РФ <br />
                                    от 26.10.2021 №1134
                                </p>
                            </section>
                            <span className={styles.divider}></span>
                            <section className={styles.list__main}>
                                <dt className={styles.list_main_line}>
                                    <h4 className={styles.list_main_title}>Продавец:</h4>
                                    <p className={styles.list_main_text}>
                                        {sellerContractor?.name}
                                    </p>
                                </dt>
                                <dt className={styles.list_main_line}>
                                    <h4 className={styles.list_main_title}>Адрес:</h4>
                                    <p className={styles.list_main_text}>
                                        {sellerContractor?.address}
                                    </p>
                                </dt>
                                <dt className={styles.list_main_line}>
                                    <h4 className={styles.list_main_title}>ИНН/КПП продавца:</h4>
                                    <p className={styles.list_main_text}>
                                        {sellerContractor?.inn} / {sellerContractor?.kpp}
                                    </p>
                                </dt>
                                <dt className={styles.list_main_line}>
                                    <h4 className={styles.list_main_title}>
                                        Грузоотправитель и его адрес:
                                    </h4>
                                    <p className={styles.list_main_text}>
                                        {shipperContractor?.name} {shipperContractor?.address}
                                    </p>
                                </dt>
                                <dt className={styles.list_main_line}>
                                    <h4 className={styles.list_main_title}>
                                        Грузополучатель и его адрес:
                                    </h4>
                                    <p className={styles.list_main_text}>
                                        {consigneeContractor?.name} {consigneeContractor?.address}
                                    </p>
                                </dt>
                                <dt className={styles.list_main_line}>
                                    <h4 className={styles.list_main_title}>
                                        Документ об отгрузке:
                                    </h4>
                                    <p className={styles.list_main_text}>
                                        №{documentData.number} от {formattedDate(documentData.date)}
                                    </p>
                                </dt>

                                <dt className={styles.list_main_line}>
                                    <h4 className={styles.list_main_title}>ИНН/КПП плательщика</h4>
                                    <p className={styles.list_main_text}>
                                        {payerContractor.inn} / {payerContractor.kpp}
                                    </p>
                                </dt>
                                <dt className={styles.list_main_line}>
                                    <h4 className={styles.list_main_title}>Адрес плательщика:</h4>
                                    <p className={styles.list_main_text}>
                                        {payerContractor.address}
                                    </p>
                                </dt>

                                <dt className={styles.list_main_line}>
                                    <h4 className={styles.list_main_title}>
                                        Валюта: наименование, код:
                                    </h4>
                                    <p className={styles.list_main_text}>Российский рубль, 643</p>
                                </dt>
                                <dt className={styles.list_main_line}>
                                    <h4 className={styles.list_main_title}>
                                        Идентификатор госудаственного контрактра, договора
                                        (соглашения) (при наличии)
                                    </h4>
                                    <p className={styles.list_main_text}>-</p>
                                </dt>
                            </section>
                        </div>
                    </main>
                </div>
            </ThemeContext.Provider>
        </>
    );
};
