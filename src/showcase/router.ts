import { useSyncExternalStore } from "react"

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange)
  return () => window.removeEventListener("hashchange", onChange)
}

export function useSlug() {
  return useSyncExternalStore(subscribe, () =>
    decodeURIComponent(window.location.hash.slice(2))
  )
}
