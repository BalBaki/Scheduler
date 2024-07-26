import * as z from 'zod';

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
        'Only supported jpeg, jpg, png, webp',
    );
