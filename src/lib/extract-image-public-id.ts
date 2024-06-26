export const extractImagePublicId = (imageUrl: string): string => {
    const parts = imageUrl.split('/');

    return parts[parts.length - 1].split('.')[0];
};
