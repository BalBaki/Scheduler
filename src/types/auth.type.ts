import { z } from 'zod/v4';
import { credentialsSignInSchema, signUpSchema } from '@/schemas';
import type { AsyncResult, BaseError, FormState } from './common.type';

export type CredentialsSignInForm = z.infer<typeof credentialsSignInSchema>;
export type SignUpForm = z.infer<typeof signUpSchema>;

type SignUp = {};
type SignUpError = FormState<SignUpForm>;

type CredentialsSignIn = {};
type CredentialsSignInError = FormState<CredentialsSignInForm>;

type SignOut = {};
type SignOutError = BaseError;

export type SignUpResult = AsyncResult<SignUp, SignUpError>;
export type CredentialsSignInResult = AsyncResult<
    CredentialsSignIn,
    CredentialsSignInError
>;
export type SignOutResult = AsyncResult<SignOut, SignOutError>;
