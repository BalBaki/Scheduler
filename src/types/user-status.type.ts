import { z } from 'zod/v4';
import { changeUserStatusSchema } from '@/schemas';
import type { AsyncResult, BaseError } from './common.type';

type ChangeUserStatus = {};
type ChangeUserStatusError = BaseError;

type ApproveAllWaitingUsers = {};
type ApproveAllWaitingUsersError = BaseError;

export type ChangeUserStatusResult = AsyncResult<
    ChangeUserStatus,
    ChangeUserStatusError
>;
export type ApproveAllWaitingUsersResult = AsyncResult<
    ApproveAllWaitingUsers,
    ApproveAllWaitingUsersError
>;
export type ChangeUserStatusPayload = z.infer<typeof changeUserStatusSchema>;
