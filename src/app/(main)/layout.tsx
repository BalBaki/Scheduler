import Footer from '@/components/Footer';
import Header from '@/components/Header';
import UserStatus from '@/components/UserStatus';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <main role="main" className="relative flex-1">
                <UserStatus>{children}</UserStatus>
            </main>
            <Footer />
        </>
    );
}
