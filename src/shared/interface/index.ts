import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export interface UserTypes {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    surname: string; // Отчество
    role: UserRoleTypes;
}

export interface UserRoleTypes {
    id: number;
    name: string;
    role_type: string;
}
export interface ButtonDocsProps {
    id?: number;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    icon: string | StaticImport;
    iconHover: string | StaticImport;
    danger?: boolean;
    children: React.ReactNode;
}

export interface DocumentTypes {
    id: number;
    number: string;
    date: string;
    category: DocumentCategory;
    contractors: Contractors[];
    products: Products[];
    total_price: number;
    total_nds: number;
    status: DocumentStatus;
    creator: number;
    receivers: number;
    comment: string;
    history: DocumentHistory[];
    signed: boolean;
    contractors_categories: ContractorsCategories;
    annuled: boolean;
}

export interface DocumentCategory {
    id: number;
    name: string;
}

export interface Products {
    id: number;
    name: string;
    units: string;
    amount: number;
    price: number;
    nds: number;
}

export interface Contractors {
    id: number;
    name: string;
    inn: string;
    kpp: string;
    ogrn: string;
    okpo: string;
    supervisor: string;
    address: string;
    registration_data: string;
}

export interface DocumentHistory {
    id: number;
    status: number;
    comment: string;
    date: string;
    time: string;
    approved: boolean;
}

export interface DocumentStatus {
    id: number;
    name: string;
    roles: UserRoleTypes[];
    status_id: number;
}

export interface ContractorsCategories {
    payer: number;
    seller: number;
    shipper: number;
    provider: number;
    consignee: number;
}