export type ResultWithError<K extends string> = {
    [key in K]: boolean;
} & {
    error?: string;
};
