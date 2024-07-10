export type FormState<K extends string, T> = (K extends ''
    ? {}
    : {
          [key in K]: boolean;
      }) & {
    errors?: { [key in keyof T]?: string[] };
} & {
    errors?: { _form?: string };
};
