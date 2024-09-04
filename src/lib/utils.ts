import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(data: string) {
    return data.charAt(0).toUpperCase() + data.slice(1);
}
