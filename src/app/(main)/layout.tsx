import '../globals.css';
import 'react-toastify/ReactToastify.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '../providers';
import Header from '@/components/header';
import { ToastContainer } from 'react-toastify';
import HomeIcon from '@/components/home-icon';
import UserStatus from '@/components/user-status';

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
                    <div className="mx-2">
                        <Header />
                        <UserStatus>
                            <main>{children}</main>
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
                    </div>
                </Providers>
            </body>
        </html>
    );
}
