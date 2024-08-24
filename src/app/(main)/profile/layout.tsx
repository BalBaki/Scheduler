import Tabs from '@/components/profile/tabs';

type ProfileLayoutProps = {
    children: React.ReactNode;
};

export default function ProfileLayout({ children }: ProfileLayoutProps) {
    return (
        <div className="mx-2 mt-1 flex gap-2 max-md:flex-col max-sm:gap-y-2">
            <Tabs />
            {children}
        </div>
    );
}
