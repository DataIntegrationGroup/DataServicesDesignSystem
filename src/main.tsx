import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ShowcaseApp } from './showcase/app.tsx'
import { DemoFrame } from './showcase/frame.tsx'
import { PALETTES, PALETTE_STORAGE_KEY } from './showcase/palettes.ts'
import { ThemeProvider } from './components/theme-provider.tsx'
import { TooltipProvider } from './components/ui/tooltip.tsx'
import { Toaster } from './components/ui/sonner.tsx'

// ?embed=<demo> renders one demo alone, for block preview iframes.
const embed = new URLSearchParams(window.location.search).get('embed')

// Ignore a saved palette that no longer exists, e.g. after a rename.
const savedPalette = localStorage.getItem(PALETTE_STORAGE_KEY)
const palette = PALETTES.find((p) => p.value === savedPalette)?.value

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider
      defaultTheme="system"
      storageKey="dsds-theme"
      palette={palette}
    >
      <TooltipProvider>
        {embed ? <DemoFrame name={embed} /> : <ShowcaseApp />}
        <Toaster richColors closeButton />
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>,
)
