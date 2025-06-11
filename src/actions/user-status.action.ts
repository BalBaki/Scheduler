'use server';

import { UserManagementService } from '@/services/user-management.service';
import { ChangeUserStatusPayload } from '@/types';

export const approveAllUsers = async () => {
    return UserManagementService.approveAllUsers();
};

export const updateUserStatus = async (data: ChangeUserStatusPayload) => {
    return UserManagementService.updateUserStatus(data);
};
