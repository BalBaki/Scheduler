import { cache } from 'react';
import db from '..';
import type { UserFilterForm } from '@/types';

export const getUserCount = cache(
    async (data: UserFilterForm): Promise<number> => {
        try {
            return await db.user.count({
                where: {
                    ...(data.status !== 'ALL' && {
                        status: data.status,
                    }),
                    ...(data.query && {
                        email: { contains: data.query },
                    }),
                },
            });
        } catch (error) {
            throw new Error('Something went wrong...!');
        }
    },
);
