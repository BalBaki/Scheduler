import { z } from 'zod/v4';
import { signInSchema, signUpSchema } from '@/schemas';
import type { AsyncResult, BaseError, FormState } from './common.type';

export type SignInForm = z.infer<typeof signInSchema>;
export type SignUpForm = z.infer<typeof signUpSchema>;

type SignUp = {};
type SignUpError = FormState<SignUpForm>;

type CredentialsSignIn = {};
type CredentialsSignInError = FormState<SignInForm>;

type SignOut = {};
type SignOutError = BaseError;

export type SignUpResult = AsyncResult<SignUp, SignUpError>;
export type CredentialsSignInResult = AsyncResult<
    CredentialsSignIn,
    CredentialsSignInError
>;
export type SignOutResult = AsyncResult<SignOut, SignOutError>;
