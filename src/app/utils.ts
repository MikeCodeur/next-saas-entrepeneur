import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function processUnknownError(error: unknown) {
  console.error("processUnknownError error:", error)
  if (error instanceof Error) {
    return error.message
  } else if (typeof error === "string") {
    return error
  } else {
    return "Une erreur inconnue." as const
  }
}

/**
 * Creates a new URL with a query parameter appended to it.
 * @param {string} paramName - The name of the query parameter.
 * @param {string | number | boolean} value - The value of the query parameter.
 * @param {URL} [url] - The URL to append the query parameter to. If not provided, the current URL will be used.
 * @return {URL} The new URL with the query parameter appended.
 * @warning Only use in client side
 */
export function createQueryParam(
  paramName: string,
  value: string | number | boolean,
  url?: URL
): URL {
  const newUrl = url ?? new URL(window.location.href)
  newUrl.searchParams.set(paramName, String(value))
  return newUrl
}

type QueryParam = {
  name: string
  value: string | number | boolean
}
export function createQueriesParams(queries: QueryParam[]) {
  let url: URL = new URL(window.location.href)
  for (const query of queries) {
    url = createQueryParam(query.name, query.value, url)
  }
  return url
}
