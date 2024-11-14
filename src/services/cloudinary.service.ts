import { v2 as cloudinary } from 'cloudinary';
import type { UploadApiOptions, UploadApiResponse } from 'cloudinary';

if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET)
    throw new Error('Missing CLOUDINARY Auth Credentials..!');

cloudinary.config({
    cloud_name: 'schedular',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

type FileUpload =
    | {
          upload: true;
          data: UploadApiResponse;
          error?: never;
      }
    | {
          upload: false;
          data?: never;
          error: string;
      };

class CloudinaryService {
    uploadFile = async (
        file: File,
        options: UploadApiOptions,
    ): Promise<FileUpload> => {
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

            return { upload: true, data: fileUploadResponse };
        } catch (error) {
            return {
                upload: false,
                error:
                    error instanceof Error
                        ? error.message
                        : 'File upload failed..!',
            };
        }
    };
}

const cloudinaryService = new CloudinaryService();

export { cloudinaryService };
