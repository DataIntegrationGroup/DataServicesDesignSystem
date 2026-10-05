import * as React from "react"

const subscribe = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange)
  return () => window.removeEventListener("hashchange", onChange)
}

const read = () => window.location.hash.replace(/^#\/?/, "")

/** The current route from a `#/slug` or `#/slug/section` URL (slug "" on the
 *  home page). Hash routes need no server config, so the showcase works on
 *  static hosting; the section part stands in for a `#section` anchor. */
export function useRoute() {
  const route = React.useSyncExternalStore(subscribe, read)
  const [slug, section] = route.split("/")
  return { slug, section: section || undefined }
}

export const href = (slug: string, section?: string) =>
  section ? `#/${slug}/${section}` : `#/${slug}`
