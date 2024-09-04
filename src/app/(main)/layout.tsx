import '../globals.css';
import 'react-toastify/ReactToastify.css';
import 'ckeditor5/ckeditor5.css';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import Footer from '@/components/footer';
import Header from '@/components/header';
import UserStatus from '@/components/user-status';
import { METADATA_TITLE_SITE_NAME } from '@/lib/constants';
import Providers from '../providers';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: METADATA_TITLE_SITE_NAME,
    description: `Connect with healthcare professionals and manage your appointments online. Whether you're a doctor or a patient, ${METADATA_TITLE_SITE_NAME} offers a seamless experience for scheduling, booking, and managing healthcare services.`,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className + ' flex min-h-screen flex-col'}>
                <Providers>
                    <Header />
                    <UserStatus>
                        <main role="main" className="flex-1">
                            {children}
                        </main>
                        <Footer />
                    </UserStatus>
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
