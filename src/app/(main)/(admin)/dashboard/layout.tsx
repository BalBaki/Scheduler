export default function DashboadLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className="mx-2">{children}</div>;
}
