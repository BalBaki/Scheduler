import type { AsyncResult, BaseError, FormState } from './common.type';
import type { UserDetailForm } from './form.type';

type UpdateUserDetail = {};
type UpdateUserDetailError = FormState<UserDetailForm>;

type UpdateProfilePicture = {};
type UpdateProfilePictureError = BaseError;

export type UpdateUserDetailResult = AsyncResult<
    UpdateUserDetail,
    UpdateUserDetailError
>;
export type UpdateProfilePictureResult = AsyncResult<
    UpdateProfilePicture,
    UpdateProfilePictureError
>;
