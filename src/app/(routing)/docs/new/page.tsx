'use client';

import { DocumentNewHeader } from '@/features/documentNewHeader';
import { DocumentNewImportDoc } from '@/features/documentNewImportDoc';
import { Gapped } from '@/shared/gapped';

export default function Home() {
    return (
        <>
            <Gapped style={{ paddingTop: '32px', paddingRight: '56px' }} gap="16px" vertical>
                <DocumentNewHeader />
                <DocumentNewImportDoc />
            </Gapped>
        </>
    );
}
