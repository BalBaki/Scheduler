'use server';

import { AuthService } from '@/services/auth.service';
import type {
    CredentialsSignInForm,
    CredentialsSignInResult,
    SignUpForm,
} from '@/types';

export const signUp = async (formData: SignUpForm) => {
    return await AuthService.signUp(formData);
};

export const credentialsSignIn = async (
    formData: CredentialsSignInForm,
): CredentialsSignInResult => {
    return await AuthService.credentialsSignIn(formData);
};

export const signout = async () => {
    return await AuthService.signOut();
};
