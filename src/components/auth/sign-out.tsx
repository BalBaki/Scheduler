'use client';

import { useFormState } from 'react-dom';
import { signout } from '@/actions/sign-out';
import { useEffect } from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import type { ButtonProps } from '../ui/button';

export default function SignOut({ type, className, ...rest }: ButtonProps) {
    const [result, dispatch] = useFormState(signout, { logout: false });

    useEffect(() => {
        result.logout && location.replace('/');
    }, [result]);

    return (
        <form action={dispatch} className="inline">
            <Button className={cn('w-20 border-black', className)} aria-label="Sign Out" {...rest}>
                Sign Out
            </Button>
        </form>
    );
}
