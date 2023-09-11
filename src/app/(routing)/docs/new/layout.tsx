import { NavBarDesktop } from '@/features/navBarDesktop';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div style={{ display: 'flex', gap: '16px' }}>
                <NavBarDesktop />
                <main style={{ width: '100%' }}>{children}</main>
            </div>
        </>
    );
}
