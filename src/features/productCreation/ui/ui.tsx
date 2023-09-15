/*'use client';
import { useState } from 'react';
import { Input, Select } from '@skbkontur/react-ui';
import styles from './ui.module.scss';
import Plus from '../../../../public/buttonIcons/plus.svg';
import X from '../../../../public/globalIcons/x.svg';
import Image from 'next/image';

export const ProductCreation = () => {
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

type LineWrapProps = {
    index: number;
    data?: object;
    saveData?: any;
};

export interface Data {
    name?: string;
    quantity?: string;
    unit?: string;
    price?: string;
    vat?: string;
    total_price?: number;
}
import React, { useContext } from 'react';

const DataContext = React.createContext<
    | {
          stateData: {};
          setStateData: React.Dispatch<React.SetStateAction<{}>>;
      }
    | undefined
>(undefined);
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
            saveData(index, updatedData); // Передаем обновленные данные
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
*/