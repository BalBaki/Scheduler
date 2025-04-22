export type FormState<
    K extends string,
    T extends Record<string, any>,
> = (K extends ''
    ? {}
    : {
          [key in K]: boolean;
      }) & {
    errors?: { [key in keyof T]?: string[] };
} & {
    errors?: { _form?: string };
};
