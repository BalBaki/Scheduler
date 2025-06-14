import { AsyncResult, BaseError } from './common.type';
import type { UploadApiResponse } from 'cloudinary';

export type UploadFileResult = AsyncResult<UploadApiResponse, BaseError>;
