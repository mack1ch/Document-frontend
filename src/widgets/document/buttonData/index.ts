import { ButtonDocsProps } from '@/shared/interface';
import Send from '../../../../public/docsIcons/send.svg';
import SendHover from '../../../../public/docsIcons/sendHover.svg';
import DangerTriangle from '../../../../public/docsIcons/dangerTriangle.svg';
import DangerTriangleHover from '../../../../public/docsIcons/dangerTriangleHover.svg';
import ArrowRight from '../../../../public/docsIcons/arrowRight.svg';
import ArrowRightHover from '../../../../public/docsIcons/arrowRightHover.svg';
import Download from '../../../../public/docsIcons/download.svg';
import DownloadHover from '../../../../public/docsIcons/downloadHover.svg';
import Print from '../../../../public/docsIcons/print.svg';
import PrintHover from '../../../../public/docsIcons/printerHover.svg';
import Delete from '../../../../public/docsIcons/delete.svg';
import DeleteHover from '../../../../public/docsIcons/deleteHover.svg';
import Pen from '../../../../public/docsIcons/pen.svg';
import PenHover from '../../../../public/docsIcons/penHover.svg';
import Close from '../../../../public/docsIcons/closeSquare.svg';
import CloseHover from '../../../../public/docsIcons/closeSquareHover.svg';
import TickSquare from '../../../../public/docsIcons/tickSquare.svg';
import TickSquareHover from '../../../../public/docsIcons/tickSquareHover.svg';

//Если документ согласован и подписан
export const ButtonDataAgreedSigned: ButtonDocsProps[] = [
    {
        id: 0,
        children: 'Запросить аннулирование',
        icon: DangerTriangle,
        iconHover: DangerTriangleHover,
    },
    {
        id: 1,
        children: 'Согласование',
        icon: ArrowRight,
        iconHover: ArrowRightHover,
    },
    {
        id: 2,
        children: 'Скачать',
        icon: Download,
        iconHover: DownloadHover,
    },
    {
        id: 3,
        children: 'Распечатать',
        icon: Print,
        iconHover: PrintHover,
    },
    {
        id: 4,
        children: 'Удалить',
        icon: Delete,
        iconHover: DeleteHover,
    },
];

//Если документ не подписан, но согласован
export const ButtonDataNoAgreedSigned: ButtonDocsProps[] = [
    {
        id: 0,
        children: 'Подписать',
        icon: Pen,
        iconHover: PenHover,
    },
    {
        id: 1,
        children: 'Отказать',
        icon: Close,
        iconHover: CloseHover,
        danger: true,
    },

    {
        id: 2,
        children: 'Согласование',
        icon: ArrowRight,
        iconHover: ArrowRightHover,
    },
    {
        id: 3,
        children: 'Скачать',
        icon: Download,
        iconHover: DownloadHover,
    },
    {
        id: 4,
        children: 'Распечатать',
        icon: Print,
        iconHover: PrintHover,
    },
    {
        id: 5,
        children: 'Удалить',
        icon: Delete,
        iconHover: DeleteHover,
    },
];

//Если документ не подписан и не согласован
export const ButtonDataNoAgreedNoSigned: ButtonDocsProps[] = [
    {
        id: 0,
        children: 'Согласовать',
        icon: TickSquare,
        iconHover: TickSquareHover,
    },
    {
        id: 1,
        children: 'Отказать',
        icon: Close,
        iconHover: CloseHover,
        danger: true,
    },
    {
        id: 2,
        children: 'Согласование',
        icon: ArrowRight,
        iconHover: ArrowRightHover,
    },
    {
        id: 3,
        children: 'Скачать',
        icon: Download,
        iconHover: DownloadHover,
    },
    {
        id: 4,
        children: 'Распечатать',
        icon: Print,
        iconHover: PrintHover,
    },
    {
        id: 5,
        children: 'Удалить',
        icon: Delete,
        iconHover: DeleteHover,
    },
];
