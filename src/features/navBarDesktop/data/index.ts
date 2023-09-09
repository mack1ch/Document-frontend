import { NavBarElementProps } from '@/entities/navBarElement';
import DefaultFile from '../../../../public/globalIcons/defaultFile.svg';
import Сounterparties from '../../../../public/globalIcons/counterparties.svg';
import Messages from '../../../../public/globalIcons/messages.svg';
import DirectoryQuestion from '../../../../public/globalIcons/questionMark.svg';
import Settings from '../../../../public/globalIcons/settings.svg';
import User from '../../../../public/globalIcons/user.svg';
export const middleSectionElements: NavBarElementProps[] = [
    {
        id: 0,
        title: 'Документы',
        link: '/',
        icon: DefaultFile,
        elements: [
            {
                id: 0,
                title: 'Входящие',
                link: '/',
            },
            {
                id: 1,
                title: 'Внутренние',
                link: '/',
            },
        ],
    },
    {
        id: 1,
        title: 'Контрагенты',
        link: '/',
        icon: Сounterparties,
        elements: [
            {
                id: 0,
                title: 'Контрагент 1 ',
                link: '/',
            },
            {
                id: 1,
                title: 'Контрагент 1',
                link: '/',
            },
        ],
    },
    {
        id: 2,
        title: 'Сообщения',
        link: '/',
        icon: Messages,
    },
    {
        id: 3,
        title: 'Справочная',
        link: '/',
        icon: DirectoryQuestion,
    },
];

export const lastSectionElements: NavBarElementProps[] = [
    {
        id: 4,
        title: 'Настройки',
        link: '/',
        icon: Settings,
    },
    {
        id: 5,
        title: 'Дмитрий Степанов',
        link: '/',
        icon: User,
    },
];
