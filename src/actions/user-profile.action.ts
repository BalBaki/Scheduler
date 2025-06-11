'use server';

import { UserService } from '@/services/user.service';
import type { UserDetailForm } from '@/types';

export const updateUserDetail = async (formData: UserDetailForm) => {
    return UserService.updateUserDetail(formData);
};

export const updateProfilePicture = async (formData: FormData) => {
    return UserService.updateProfilePicture(formData);
};
