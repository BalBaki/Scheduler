import Footer from '@/components/footer';
import Header from '@/components/header';
import UserStatus from '@/components/user-status';

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
