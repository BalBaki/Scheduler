import './globals.css';
import 'react-toastify/ReactToastify.css';
import 'react-quill-new/dist/quill.snow.css';
import 'nprogress/nprogress.css';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import Providers from './providers';
import { env } from '@/services/env.service';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <div className="flex h-dvh min-h-svh flex-col">
                        {children}
                    </div>
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
