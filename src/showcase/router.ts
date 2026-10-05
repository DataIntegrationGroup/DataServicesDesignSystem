import * as React from "react"

const subscribe = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange)
  return () => window.removeEventListener("hashchange", onChange)
}

const read = () => window.location.hash.replace(/^#\/?/, "")

/** The current page slug from a `#/slug` URL ("" on the home page). Hash
 *  routes need no server config, so the showcase works on static hosting. */
export function useRouteSlug() {
  return React.useSyncExternalStore(subscribe, read)
}

export const href = (slug: string) => `#/${slug}`
