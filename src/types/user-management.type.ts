import { UserStatus } from '@prisma/client';
import { z } from 'zod/v4';
import { UserWithoutPassword } from './user-without-password';
import { changeUserStatusSchema, usersSearchParamsSchema } from '@/schemas';
import type {
    AsyncResult,
    BaseError,
    PaginatedDataParams,
} from './common.type';

type ChangeUserStatus = {};
type ChangeUserStatusError = BaseError;

type ApproveAllWaitingUsers = {};
type ApproveAllWaitingUsersError = BaseError;

type GetPaginatedUsers = {
    users: UserWithoutPassword[];
    userCount: number;
};
type GetPaginatedUsersError = BaseError;

export type ChangeUserStatusResult = AsyncResult<
    ChangeUserStatus,
    ChangeUserStatusError
>;
export type ApproveAllWaitingUsersResult = AsyncResult<
    ApproveAllWaitingUsers,
    ApproveAllWaitingUsersError
>;
export type GetPaginatedUsersResult = AsyncResult<
    GetPaginatedUsers,
    GetPaginatedUsersError
>;
export interface GetPaginatedUserParams extends PaginatedDataParams {
    status: UserStatus | 'ALL';
}
export type ChangeUserStatusPayload = z.infer<typeof changeUserStatusSchema>;
export type UsersSearchParams = z.infer<typeof usersSearchParamsSchema>;
