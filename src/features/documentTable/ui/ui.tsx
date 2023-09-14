'use client';
import { useState, useEffect } from 'react';
import { TableStateCircle } from '@/shared/tableStateCircle/ui/ui';
import styles from './ui.module.scss';
import Link from 'next/link';
import { instanceLogged } from '@/shared/api/axios';
import { DocumentTypes } from '@/shared/interface';
const BASE_URL = 'https://docs.inverse-team.store/api/documents/';
import { parseISO } from 'date-fns';

export const DocumentTable = ({ id }: { id: number }) => {
    const [documentData, setDocumentData] = useState<DocumentTypes[] | null>(null);
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
    }, []);
    const contractorsInn = documentData?.flatMap((document) =>
        document.contractors.map((contractor) => contractor.inn),
    );

    return (
        <>
            <section className={styles.layout}>
                <table style={{ borderSpacing: '0px 32px' }} width="100%">
                    <tbody className={styles.table__body}>
                        <tr>
                            <td align="left" className={styles.tableHeader}>
                                Контрагент
                            </td>
                            <td align="left" className={styles.tableHeader}>
                                Документы
                            </td>
                            <td align="left" className={styles.tableHeader}>
                                Статус
                            </td>
                            <td align="left" className={styles.tableHeader}>
                                Дата{' '}
                            </td>
                        </tr>
                        {documentData?.map((doc: DocumentTypes) => {
                            const docDate = parseISO(doc.date);
                            const formattedDate = Intl.DateTimeFormat('ru-RU').format(docDate);

                            return (
                                <tr key={doc.id} className={styles.border}>
                                    <td className={styles.tableElement}>{contractorsInn}</td>
                                    <td className={styles.tableElement}>
                                        <Link href={`/document/${doc.id}`}>
                                            <span className={styles.tableElement__grey}>
                                                {doc.category.name} №{doc.number} от {formattedDate}
                                            </span>{' '}
                                            <br />
                                            486.00 ₽{' '}
                                            <span className={styles.tableElement__grey}>
                                                НДС: {doc.total_nds} ₽
                                            </span>
                                        </Link>
                                    </td>

                                    <td className={styles.tableElementLayout}>
                                        <TableStateCircle state="signed_agreed_upon" />
                                        <div className={styles.tableElement}>
                                            {doc.status.name} <br />
                                            <span
                                                title="Степанов Дмитрий Андреевич"
                                                className={styles.tableElement__grey}>
                                                На согласовании: Степанов Дмитрий Андреевич
                                            </span>
                                        </div>
                                    </td>
                                    <td className={styles.tableElement}>{formattedDate}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </section>
        </>
    );
};
