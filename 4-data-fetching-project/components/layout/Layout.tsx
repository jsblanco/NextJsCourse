import { ReactNode } from 'react';
import MainHeader from './MainHeader';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <MainHeader/>
            <main>
                {children}
            </main>
        </>
    )
}
