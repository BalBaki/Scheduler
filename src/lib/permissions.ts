import { Roles } from '@prisma/client';
import type { UserWithoutPassword } from '../types';

type Actions = {
    user: 'changeStatus' | 'update' | 'moreDetail';
    appointment: 'create' | 'read' | 'delete' | 'update' | 'book' | 'cancel';
    dashboard: 'view';
};

type Permissions = {
    [Role in Roles]?: {
        [Resource in keyof Actions]?: {
            [Action in Actions[Resource]]?: boolean;
        };
    };
};

const permissions: Permissions = {
    DOCTOR: {
        appointment: {
            create: true,
            delete: true,
            update: true,
            read: true,
        },
        user: {
            update: true,
            moreDetail: true,
        },
    },
    PATIENT: {
        appointment: {
            book: true,
            cancel: true,
        },
        user: {
            update: true,
        },
    },
};

export const hasPermission = <T extends keyof Actions>(
    user: Omit<UserWithoutPassword, 'createdAt' | 'updatedAt'>,
    resource: T,
    actions: Actions[T][] | Actions[T],
) => {
    if (user.status !== 'APPROVED') return false;
    if (user.role === 'ADMIN') return true;

    if (!(actions instanceof Array)) actions = [actions];

    return actions.every(
        (action) => permissions[user.role]?.[resource]?.[action] ?? false,
    );
};
