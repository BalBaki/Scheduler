'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { signout } from '@/actions/sign-out';
import { triggerClientSessionUpdate } from '@/lib/trigger-client-session-update';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import type { ButtonProps } from '../ui/button';

export default function SignOut({
    type,
    className,
    onClick,
    ...rest
}: ButtonProps) {
    const router = useRouter();
    const { mutate: logout } = useMutation({
        mutationFn: signout,
        async onSuccess({ logout }) {
            if (logout) {
                router.push('/');

                await triggerClientSessionUpdate();
            }
        },
    });

    return (
        <Button
            className={cn('w-20 border-black', className)}
            aria-label="Sign Out"
            onClick={(event) => {
                logout();

                onClick && onClick(event);
            }}
            {...rest}
        >
            Sign Out
        </Button>
    );
}
