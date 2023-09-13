import { TableStateCircle } from '@/shared/tableStateCircle/ui/ui';
import styles from './ui.module.scss';

export const DocumentTable = () => {
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
                        <tr className={styles.border}>
                            <td className={styles.tableElement}>ООО “Ромашка”</td>
                            <td className={styles.tableElement}>
                                <span className={styles.tableElement__grey}>
                                    УПД №5 от 12.02.2021
                                </span>{' '}
                                <br />
                                486.00 ₽{' '}
                                <span className={styles.tableElement__grey}>НДС: 78 ₽</span>
                            </td>
                            <td className={styles.tableElementLayout}>
                                <TableStateCircle state="signed_agreed_upon" />
                                <div className={styles.tableElement}>
                                    Требуется подпись <br />
                                    <span
                                        title="Степанов Дмитрий Андреевич"
                                        className={styles.tableElement__grey}>
                                        На согласовании: Степанов Дмитрий Андреевич
                                    </span>
                                </div>
                            </td>
                            <td className={styles.tableElement}>06.02.2022</td>
                        </tr>
                        <tr className={styles.border}>
                            <td className={styles.tableElement}>ООО “Ромашка”</td>
                            <td className={styles.tableElement}>
                                <span className={styles.tableElement__grey}>
                                    УПД №5 от 12.02.2021
                                </span>{' '}
                                <br />
                                486.00 ₽{' '}
                                <span className={styles.tableElement__grey}>НДС: 78 ₽</span>
                            </td>
                            <td className={styles.tableElementLayout}>
                                <TableStateCircle state="canceled" />
                                <div className={styles.tableElement}>
                                    Требуется подпись <br />
                                    <span
                                        title="Степанов Дмитрий Андреевич"
                                        className={styles.tableElement__grey}>
                                        На согласовании: Степанов Дмитрий Андреевич
                                    </span>
                                </div>
                            </td>
                            <td className={styles.tableElement}>06.02.2022</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </>
    );
};
