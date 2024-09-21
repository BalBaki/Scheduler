export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main role="main" className="h-screen">
            {/* <AuthRoute> */}
            {children}
            {/* </AuthRoute> */}
        </main>
    );
}
