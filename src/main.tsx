import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ShowcaseApp } from './showcase/app.tsx'
import { PALETTE_STORAGE_KEY } from './showcase/palettes.ts'
import { ThemeProvider } from './components/theme-provider.tsx'
import { TooltipProvider } from './components/ui/tooltip.tsx'
import { Toaster } from './components/ui/sonner.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider
      defaultTheme="system"
      storageKey="dsds-theme"
      palette={localStorage.getItem(PALETTE_STORAGE_KEY) ?? undefined}
    >
      <TooltipProvider>
        <ShowcaseApp />
        <Toaster richColors closeButton />
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>,
)
