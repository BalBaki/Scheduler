'use server';

import { UserService } from '@/services/user.service';
import type { UserDetailForm } from '@/types';

export const updateDetail = async (formData: UserDetailForm) => {
    return UserService.updateDetail(formData);
};

export const updateProfilePicture = async (formData: FormData) => {
    return UserService.updateProfilePicture(formData);
};

export const updateBannerPicture = async (formData: FormData) => {
    return UserService.updateProfileBanner(formData);
};
