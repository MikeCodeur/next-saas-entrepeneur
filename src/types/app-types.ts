export type PageProps<TSearch, TParams> = {
  params?: Prettify<TParams>
  searchParams?: Prettify<TSearch>
}

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & unknown
