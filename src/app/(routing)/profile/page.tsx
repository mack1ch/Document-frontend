'use clint';

import { Profile } from '@/widgets/profile';
import PrivateRoute from '@/shared/authBlocks/privateRouter';
import { NavBarDesktop } from '@/features/navBarDesktop';
export default function Home() {
    return (
        <>
            <PrivateRoute>
                <div>
                    <NavBarDesktop />
                    <main style={{ width: '100%', flexGrow: '1', marginLeft: '270px' }}>
                        <Profile />
                    </main>
                </div>
            </PrivateRoute>
        </>
    );
}
