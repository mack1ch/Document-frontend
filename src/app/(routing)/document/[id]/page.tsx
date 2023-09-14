'use client';

import { Gapped } from '@/shared/gapped/ui/ui';
import dynamic from 'next/dynamic';

const DynamicPreview = dynamic(() =>
    import('@/widgets/document').then((module) => module.Document),
);

export default function EditEvent({ params }: { params: { id: number } }) {
    return (
        <>
            <Gapped vertical gap="32px">
                <main>
                    <DynamicPreview docID={params.id} />
                </main>
            </Gapped>
        </>
    );
}
