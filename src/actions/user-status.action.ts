'use server';

import { UserManagementService } from '@/services/user-management.service';
import { ChangeUserStatusPayload } from '@/types';

export const approveAllWaitingUsers = async () => {
    return UserManagementService.approveAllWaitingUsers();
};

export const updateUserStatus = async (data: ChangeUserStatusPayload) => {
    return UserManagementService.changeUserStatus(data);
};
