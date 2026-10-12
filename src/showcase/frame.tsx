import { lazy, Suspense, useEffect } from "react"

import { applyTheme, THEME_STORAGE_KEY } from "./theme-items"

// Full-screen demos (blocks that take over the viewport) run in an iframe
// at ?frame=<name>, so they get a window of their own.
const frames = Object.fromEntries(
  Object.entries(
    import.meta.glob<{ default: React.ComponentType }>("./frames/*.tsx")
  ).map(([path, load]) => [path, lazy(load)])
)

export function Frame({ name }: { name: string }) {
  return (
    <iframe
      title={name}
      src={`?frame=${name}`}
      className="block h-[640px] w-full bg-background"
    />
  )
}

export function FrameRoot({ name }: { name: string }) {
  // Follow the showcase's theme menu, which runs in the parent window.
  useEffect(() => {
    applyTheme(localStorage.getItem(THEME_STORAGE_KEY))
    const onStorage = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY) applyTheme(event.newValue)
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const Demo = frames[`./frames/${name}.tsx`]
  if (!Demo) return <p className="p-6">No frame named {name}.</p>
  return (
    <Suspense>
      <Demo />
    </Suspense>
  )
}
