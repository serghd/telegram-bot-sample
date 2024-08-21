export type StringNumber = string | number;

export type Promisable<T> = T | Promise<T>;

export interface Initialize {
   init: () => Promisable<void>;
}
