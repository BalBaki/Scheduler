import './globals.css';
import 'react-toastify/ReactToastify.css';
import 'ckeditor5/ckeditor5.css';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import Providers from './providers';

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
                    <div className="flex min-h-screen flex-col">{children}</div>
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
