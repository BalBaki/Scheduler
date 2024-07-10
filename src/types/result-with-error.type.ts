export type ResultWithError<K extends string> = (K extends ''
    ? {}
    : {
          [key in K]: boolean;
      }) & {
    error?: string;
};
