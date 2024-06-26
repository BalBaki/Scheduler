'use client';

import { useFormState } from 'react-dom';
import { signout } from '@/actions/sign-out';
import { useEffect } from 'react';
import { Button } from '../ui/button';

export default function SignOut() {
    const [result, dispatch] = useFormState(signout, { logout: false });

    useEffect(() => {
        result.logout && location.replace('/');
    }, [result]);

    return (
        <div>
            <form action={dispatch}>
                <Button type="submit" variant="outline" className="w-20 border-black">
                    Sign Out
                </Button>
            </form>
        </div>
    );
}
