'use client';
import { useState } from 'react';
import { Input, Select } from '@skbkontur/react-ui';
import styles from './ui.module.scss';
import Plus from '../../../../public/buttonIcons/plus.svg';
import { Button } from '@/entities/button';
import X from '../../../../public/globalIcons/x.svg';
import Image from 'next/image';
export const ProductCreation = () => {
    const [blocks, setBlocks] = useState([<LineWrap index={0} key={0} />]);
    const removeBlock = (index: number) => {
        const updatedBlocks = blocks.filter((_, i) => i !== index);
        setBlocks(updatedBlocks);
    };
    const addBlock = () => {
        setBlocks([...blocks, <LineWrap key={blocks.length} index={blocks.length} />]); // Добавление нового блока
    };
    return (
        <>
            <div className={styles.layout}>
                <h2 className={styles.title}>Товары и услуги</h2>
                {blocks.map((block, index) => (
                    <div className={styles.line__wrap} key={index}>
                        {block}
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
        </>
    );
};

const LineWrap = ({ index }: { index: number }) => {
    const SelectItems = ['Без НДС', '10%', '20%'];

    return (
        <dl className={styles.line__wrap}>
            <dt className={styles.line}>
                <span className={styles.line__text}>Название</span>
                <Input placeholder="Текст" />
            </dt>
            <dt className={styles.line}>
                <span className={styles.line__text}>Кол-во</span>
                <Input style={{ width: '80px' }} type="number" placeholder="Число" />
            </dt>
            <dt className={styles.line}>
                <span className={styles.line__text}>Ед. изм.</span>
                <Input style={{ width: '80px' }} placeholder="Текст" />
            </dt>
            <dt className={styles.line}>
                <span className={styles.line__text}>Цена, ₽</span>
                <Input style={{ width: '80px' }} placeholder="Число" type="number" />
            </dt>
            <dt className={styles.line}>
                <span className={styles.line__text}>В т.ч. НДС</span>
                <Select defaultValue={'Без НДС'} items={SelectItems} placeholder="Число" />
            </dt>
        </dl>
    );
};
