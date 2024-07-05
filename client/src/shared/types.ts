export type NestedKeys<T, Prefix extends string = ''> = T extends object
  ? {
      [K in keyof T]: T[K] extends object
        ? `${Prefix}${K & string}.${NestedKeys<T[K], ''>}`
        : `${Prefix}${K & string}`;
    }[keyof T]
  : '';
