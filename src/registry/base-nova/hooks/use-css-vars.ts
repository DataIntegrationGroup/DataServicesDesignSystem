import * as React from "react"

/** Changes whenever <html> switches between light and dark (its class). */
function subscribe(cb: () => void) {
  const observer = new MutationObserver(cb)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })
  return () => observer.disconnect()
}

function getSnapshot() {
  return document.documentElement.className
}

/**
 * Read design-token values (CSS custom properties) off <html>, re-read when
 * the light/dark class changes. For components that can't use CSS variables
 * directly, like canvas renderers.
 *
 * Pass token names without the leading dashes:
 * `const { primary, border } = useCssVars(["primary", "border"])`.
 * Keep the array stable (a module constant) so values are only re-read on a
 * mode change.
 */
export function useCssVars<const T extends string>(
  names: readonly T[]
): Record<T, string> {
  const key = React.useSyncExternalStore(subscribe, getSnapshot, () => "")
  return React.useMemo(() => {
    const values = {} as Record<T, string>
    if (typeof document === "undefined") {
      for (const name of names) values[name] = ""
      return values
    }
    const style = getComputedStyle(document.documentElement)
    for (const name of names) {
      values[name] = style.getPropertyValue(`--${name}`).trim()
    }
    return values
    // `key` is the mode signal: re-read when it changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, names])
}
