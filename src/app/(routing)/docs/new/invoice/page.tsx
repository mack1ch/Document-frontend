'use client';

import { InvoiceCreate } from '@/features/documentCreate/invoice';
import { DocumentNewHeader } from '@/features/documentNewHeader';
import { Gapped } from '@/shared/gapped';

export default function Home() {
    return (
        <>
            <Gapped style={{ paddingTop: '32px', paddingRight: '56px' }} gap="16px" vertical>
                <DocumentNewHeader />
                <InvoiceCreate />
            </Gapped>
        </>
    );
}
