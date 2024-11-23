import ApprovedUserCheck from '@/components/ApprovedUserCheck';
import Tabs from '@/components/profile/Tabs';

type ProfileLayoutProps = {
    children: React.ReactNode;
};

export default function ProfileLayout({ children }: ProfileLayoutProps) {
    return (
        <div className="mx-2 mt-1 flex gap-2 max-md:flex-col max-sm:gap-y-2">
            <ApprovedUserCheck>
                <Tabs />
                {children}
            </ApprovedUserCheck>
        </div>
    );
}
