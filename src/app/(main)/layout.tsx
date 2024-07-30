import '../globals.css';
import 'react-toastify/ReactToastify.css';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import Header from '@/components/header';
import HomeIcon from '@/components/home-icon';
import UserStatus from '@/components/user-status';
import Providers from '../providers';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <Header />
                    <UserStatus>
                        <main role="main" className="mx-2">
                            {children}
                        </main>
                    </UserStatus>
                    <HomeIcon />
                    <ToastContainer
                        position="bottom-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        theme="colored"
                    />
                </Providers>
            </body>
        </html>
    );
}
