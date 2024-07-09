export type EqualBy<T, U> = T extends U ? (U extends T ? T : [T, U]) : [T, U]
