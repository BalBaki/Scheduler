import { v2 as cloudinary } from 'cloudinary';

if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET)
    throw new Error('Missing CLOUDINARY Auth Credentials..!');

cloudinary.config({
    cloud_name: 'schedular',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
