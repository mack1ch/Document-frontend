import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Employee from '../../../../public/inverseProducts/employe.svg';
import Project from '../../../../public/inverseProducts/project.svg';
import Afisha from '../../../../public/inverseProducts/afisha.svg';

export interface InverseProductCardTypes {
    id: number;
    title: string;
    icon: string | StaticImport;
    description: string;
}

export const InverseProductCardData: InverseProductCardTypes[] = [
    {
        id: 0,
        title: 'Inverse.Кадры',
        icon: Employee,
        description: 'Сервис для вовлечения сотрудников во внутрикорпоративные активности',
    },
    {
        id: 1,
        title: 'Inverse.Project',
        icon: Project,
        description: 'Сервис для организации проектной деятельности в учебном заведении',
    },
    {
        id: 1,
        title: 'Inverse.Афиша',
        icon: Afisha,
        description: 'Сервис для формирование туристических пакетов',
    },
];
