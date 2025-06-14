import 'server-only';
import { v2 as cloudinary } from 'cloudinary';
import { env } from './env.service';
import { Status } from '@/enums';
import type { UploadApiOptions, UploadApiResponse } from 'cloudinary';
import type { UploadFileResult } from '@/types';

cloudinary.config({
    cloud_name: 'schedular',
    api_key: env.cloudinaryApiKey,
    api_secret: env.cloudinaryApiSecret,
});

export class CloudinaryService {
    static async uploadFile(
        file: File,
        options: UploadApiOptions,
    ): UploadFileResult {
        try {
            const fileAsArrayBuffer = await file.arrayBuffer();
            const fileUploadResponse: UploadApiResponse | undefined =
                await new Promise((resolve, reject) => {
                    cloudinary.uploader
                        .upload_stream(options, (error, uploadResult) => {
                            if (error) reject(error.message);

                            return resolve(uploadResult);
                        })
                        .end(Buffer.from(fileAsArrayBuffer));
                });

            if (!fileUploadResponse) throw new Error('File upload failed..!');

            return { status: Status.Ok, data: fileUploadResponse };
        } catch (error) {
            return {
                status: Status.Err,
                err:
                    error instanceof Error
                        ? error.message
                        : 'File upload failed..!',
            };
        }
    }
}
