'use client';

import { AcceptanceCertificateCreate } from '@/features/documentCreate/acceptanceCertificate';
import { DocumentNewHeader } from '@/features/documentNewHeader';
import { Gapped } from '@/shared/gapped';

export default function Home() {
    return (
        <>
            <Gapped style={{ paddingTop: '32px', paddingRight: '56px' }} gap="16px" vertical>
                <DocumentNewHeader />
                <AcceptanceCertificateCreate />
            </Gapped>
        </>
    );
}
