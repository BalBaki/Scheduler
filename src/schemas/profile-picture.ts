import { z } from "zod/v4";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];

export const profilePictureSchema = z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, 'Max image size is 5 MB')
    .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        `Only supported ${ACCEPTED_IMAGE_TYPES.map((type) => type.split('/')[1] || '').join(', ')}`,
    );
