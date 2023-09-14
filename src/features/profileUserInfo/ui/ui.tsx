'use client';

import styles from './ui.module.scss';
import Image from 'next/image';
import UserLogo from '../../../../public/img/userLogo.svg';
import Email from '../../../../public/profileIcons/email.svg';
import Role from '../../../../public/profileIcons/role.svg';
import { UserTypes } from '@/shared/interface';
import { instanceLogged } from '@/shared/api/axios';
import { useEffect, useState } from 'react';

const BASE_URL = 'https://docs.inverse-team.store/api/users/auth/users/me/';

export const ProfileUserInfo = () => {
    const [userData, setUserData] = useState<UserTypes | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instanceLogged.get(BASE_URL);
                setUserData(response.data);
            } catch (error) {
                return;
            }
        };
        fetchData();
    }, []);
    return (
        <>
            <header className={styles.wrap}>
                <dt className={styles.user}>
                    <Image src={UserLogo} width={64} height={64} alt="UserLogo" />
                    <h1 className={styles.user__fullName}>
                        {userData?.lastname} {userData?.firstname} {userData?.surname}
                    </h1>
                </dt>
                <dt className={styles.user__info}>
                    <dl className={styles.user_info_line}>
                        <dd className={styles.user_info_line_head}>
                            <Image
                                style={{ marginLeft: '10px' }}
                                src={Email}
                                width={24}
                                height={24}
                                alt="Email"
                            />
                            <p className={styles.line_title}>Почта:</p>
                        </dd>
                        <p className={styles.line_data}>{userData?.email}</p>
                    </dl>
                    <dl className={styles.user_info_line}>
                        <dd className={styles.user_info_line_head}>
                            <Image
                                style={{ marginLeft: '10px' }}
                                src={Role}
                                width={24}
                                height={24}
                                alt="Email"
                            />
                            <p className={styles.line_title}>Должность:</p>
                        </dd>
                        <p className={styles.line_data}>{userData?.role.name}</p>
                    </dl>
                </dt>
            </header>
        </>
    );
};
