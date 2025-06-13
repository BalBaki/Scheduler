import 'server-only';
import { cache } from 'react';
import { revalidatePath } from 'next/cache';
import db from './db.service';
import { auth } from '@/auth';
import { Status } from '@/enums';
import { hasPermission } from '@/lib/permissions';
import { changeUserStatusSchema } from '@/schemas';
import type {
    ApproveAllWaitingUsersResult,
    ChangeUserStatusPayload,
    ChangeUserStatusResult,
    GetPaginatedUserParams,
    GetPaginatedUsersResult,
    UserFilterForm,
} from '@/types';

export class UserManagementService {
    static async approveAllUsers(): ApproveAllWaitingUsersResult {
        try {
            const session = await auth();

            if (
                !session ||
                !hasPermission(session.user, 'user', 'changeStatus')
            ) {
                return {
                    status: Status.Err,
                    err: 'You have no authorization..!',
                };
            }

            await db.user.updateMany({
                data: { status: 'APPROVED' },
                where: { status: 'WAITING' },
            });

            revalidatePath('/dashboard/approve');
            revalidatePath('/doctor');

            return { status: Status.Ok, data: {} };
        } catch (error) {
            return { status: Status.Err, err: 'Someting went wrong..!' };
        }
    }

    static async updateUserStatus(
        data: ChangeUserStatusPayload,
    ): ChangeUserStatusResult {
        try {
            const validatedPayload = changeUserStatusSchema.safeParse(data);

            if (!validatedPayload.success)
                return {
                    status: Status.Err,
                    err: 'Enter valid data..!',
                };

            const session = await auth();

            const user = await db.user.findFirst({
                where: { id: validatedPayload.data.id },
                omit: { password: true },
            });

            if (
                !session ||
                !hasPermission(session.user, 'user', 'changeStatus') ||
                user?.role === 'ADMIN'
            ) {
                return {
                    status: Status.Err,
                    err: 'You have no authorization..!',
                };
            }

            if (!user) {
                return { status: Status.Err, err: 'Not exits User...' };
            }

            const updatedUser = await db.user.update({
                data: { status: validatedPayload.data.status },
                where: { id: user.id },
                omit: { password: true },
            });

            revalidatePath('/dashboard/approve');

            if (updatedUser.role === 'DOCTOR') {
                revalidatePath('/doctor');
            }

            return { status: Status.Ok, data: {} };
        } catch (error) {
            return { status: Status.Err, err: 'Someting went wrong..!' };
        }
    }

    static getCount = cache(async (data: UserFilterForm) => {
        return db.user.count({
            where: {
                ...(data.status !== 'ALL' && {
                    status: data.status,
                }),
                ...(data.query && {
                    email: { contains: data.query },
                }),
            },
        });
    });

    static getPaginatedUsers = async ({
        limit = 20,
        page,
        query = '',
        status = 'WAITING',
    }: GetPaginatedUserParams): GetPaginatedUsersResult => {
        try {
            const userCount = await UserManagementService.getCount({
                query,
                status,
            });
            const users = await db.user.findMany({
                omit: {
                    password: true,
                },
                where: {
                    ...(status !== 'ALL' && {
                        status,
                    }),
                    ...(query && {
                        email: { contains: query },
                    }),
                    NOT: {
                        role: 'ADMIN',
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
                skip: (page - 1) * limit,
                take: limit,
            });

            return {
                status: Status.Ok,
                data: {
                    users,
                    userCount,
                },
            };
        } catch (error) {
            return {
                status: Status.Err,
                err: 'Something went wrong..!',
            };
        }
    };
}
