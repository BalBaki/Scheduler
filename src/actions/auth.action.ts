'use server';

import { AuthService } from '@/services/auth.service';
import type { CredentialsSignInResult, SignInForm, SignUpForm } from '@/types';

export const signUp = async (formData: SignUpForm) => {
    return await AuthService.signUp(formData);
};

export const credentialsSignIn = async (
    formData: SignInForm,
): CredentialsSignInResult => {
    return await AuthService.credentialsSignIn(formData);
};

export const signout = async () => {
    return await AuthService.signOut();
};
