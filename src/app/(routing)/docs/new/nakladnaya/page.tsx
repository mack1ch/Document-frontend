'use client';

import { NakladnayaCreate } from '@/features/documentCreate/nakladnaya';
import { DocumentNewHeader } from '@/features/documentNewHeader';
import { Gapped } from '@/shared/gapped';

export default function Home() {
    return (
        <>
            <Gapped style={{ paddingTop: '32px', paddingRight: '56px' }} gap="16px" vertical>
                <DocumentNewHeader />
                <NakladnayaCreate />
            </Gapped>
        </>
    );
}
