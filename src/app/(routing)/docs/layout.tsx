import { NavBarDesktop } from '@/features/navBarDesktop';
import PrivateRoute from '@/shared/authBlocks/privateRouter';
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <PrivateRoute>
                <div style={{ display: 'flex', gap: '40px' }}>
                    <NavBarDesktop />
                    <main style={{ width: '100%', flexGrow: '1', marginLeft: '320px' }}>
                        {children}
                    </main>
                </div>
            </PrivateRoute>
        </>
    );
}
