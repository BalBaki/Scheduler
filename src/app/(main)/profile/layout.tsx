import Tabs from '@/components/profile/tabs';

type ProfileLayoutProps = {
    children: React.ReactNode;
};

export default function ProfileLayout({ children }: ProfileLayoutProps) {
    return (
        <div className="mt-1 flex gap-x-2 max-sm:flex-col max-sm:gap-y-2">
            <Tabs />
            {children}
        </div>
    );
}
