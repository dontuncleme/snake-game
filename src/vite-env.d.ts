/// <reference types="vite/client" />

declare module "*.css" {
    const classes: { [key: string]: string };
    export default classes;
}

type Dict<T = string> = Record<string, T>;
type Nullable<T> = T | null;
type Optional<T> = T | undefined;
type Nullish<T> = T | undefined | null;
