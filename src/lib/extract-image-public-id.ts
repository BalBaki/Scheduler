export const extractImagePublicId = (imageUrl: string): string => {
    let parts = imageUrl.split('/');

    let filenameWithExtension = parts[parts.length - 1];

    return filenameWithExtension.split('.')[0];
};
