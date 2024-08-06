import { cache } from 'react';
import db from '..';

export const getFeedbackCount = cache(
    async (email?: string): Promise<number> =>
        await db.feedback.count({
            where: {
                ...(email && {
                    email: { contains: email },
                }),
            },
        }),
);
