import type { AsyncResult, BaseError, FormState } from './common.type';
import type { SignInForm, SignUpForm } from './form.type';

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
