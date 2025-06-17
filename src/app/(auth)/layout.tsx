export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main role="main" className="grid h-full flex-1">
            {/* <AuthRoute> */}
            {children}
            {/* </AuthRoute> */}
        </main>
    );
}
