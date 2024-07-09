/**
 * @description Аналог дженерика Record но с сохранением вложенной структуры. В качестве первого аргумента передается тип
 */
export type DeepRecord<K extends object, T> = {
  [P in keyof K]: K[P] extends object ? DeepRecord<K[P], T> : T
}