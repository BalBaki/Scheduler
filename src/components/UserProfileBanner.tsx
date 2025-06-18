import { cn } from '@/lib/utils';

type UserProfileBannerProps = {
    url: string | null | undefined;
} & React.ComponentPropsWithRef<'div'>;

export default function UserProfileBanner({
    url,
    className,
    ...rest
}: UserProfileBannerProps) {
    return (
        <div
            style={{
                backgroundImage: `url("${url || '/assets/doctor-banner.jpg'}")`,
            }}
            className={cn('h-52 bg-cover bg-no-repeat', className)}
            aria-label="User Profile Banner"
            {...rest}
        ></div>
    );
}
