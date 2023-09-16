import { NavBarElementProps } from '@/entities/navBarElement';
import DefaultFile from '../../../../public/globalIcons/defaultFile.svg';
import Messages from '../../../../public/globalIcons/messages.svg';
import DirectoryQuestion from '../../../../public/globalIcons/questionMark.svg';
import User from '../../../../public/globalIcons/user.svg';
export const middleSectionElements: NavBarElementProps[] = [
    {
        id: 0,
        title: 'Документы',
        link: '/docs/new',
        icon: DefaultFile,
        elements: [
            {
                id: 0,
                title: 'Новый документ',
                link: '/docs/new',
            },
            {
                id: 1,
                title: 'Входящие',
                link: '/docs/incoming',
            },
        ],
    },
];

export const lastSectionElements: NavBarElementProps[] = [
    {
        id: 4,
        title: 'Дмитрий Степанов',
        link: '/',
        icon: User,
    },
];
