import { __NEXTAUTH, getSession } from 'next-auth/react';

//Fix for client session context update when user does auth actions.
export const triggerClientSessionUpdate = async () => {
    await getSession();

    await __NEXTAUTH._getSession({ event: 'storage' });
};
