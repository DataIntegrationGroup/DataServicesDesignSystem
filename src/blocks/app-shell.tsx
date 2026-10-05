import * as React from "react"
import {
  ChevronRightIcon,
  MenuIcon,
  PanelLeftCloseIcon,
  PanelLeftOpenIcon,
  XIcon,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"

export type AppShellNavItem = {
  label: string
  icon: LucideIcon
  /** Where the item links. Omit it for an action (`onSelect`) or for a
   *  parent that only opens its children. */
  href?: string
  /** Runs instead of navigating, e.g. to open a search dialog. Gets the
   *  shell's controls, so an item can open the side panel. */
  onSelect?: (shell: AppShellContextValue) => void
  /** Shown but not usable, e.g. a page that's coming soon. */
  disabled?: boolean
  /** Shown under this item. The section opens while one of its pages is
   *  current, and the user can open or close it otherwise. */
  children?: AppShellNavItem[]
}

export type AppShellNavGroup = {
  /** Hidden when the sidebar collapses to icons. */
  label?: string
  items: AppShellNavItem[]
}

type LinkProps = React.ComponentProps<"a"> & { href: string }

export type AppShellContextValue = {
  panelOpen: boolean
  openPanel: () => void
  closePanel: () => void
  togglePanel: () => void
  /** Open or collapse the sidebar without saving the choice, for layout
   *  changes the user didn't ask for (see useAutoCollapseSidebar). */
  setSidebarOpenTemporarily: (open: boolean) => void
}

const AppShellContext = React.createContext<AppShellContextValue | null>(null)

/** Controls for the shell's side panel and sidebar, for use inside AppShell. */
// eslint-disable-next-line react-refresh/only-export-components
export function useAppShell() {
  const context = React.useContext(AppShellContext)
  if (!context) throw new Error("useAppShell must be used within an AppShell")
  return context
}

/**
 * Collapses the sidebar while the calling component is mounted, and restores
 * it on unmount if it was open. Use it on pages that need the width, such as
 * a full-screen map.
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useAutoCollapseSidebar(enabled = true) {
  const { open } = useSidebar()
  const { setSidebarOpenTemporarily } = useAppShell()
  const wasOpen = React.useRef(open)

  React.useEffect(() => {
    if (!enabled) return
    const restore = wasOpen.current
    setSidebarOpenTemporarily(false)
    return () => {
      if (restore) setSidebarOpenTemporarily(true)
    }
  }, [enabled, setSidebarOpenTemporarily])
}

const isWithin = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`)

const hrefsOf = (items: AppShellNavItem[]): string[] =>
  items.flatMap((item) => [
    ...(item.href ? [item.href] : []),
    ...hrefsOf(item.children ?? []),
  ])

/** The most specific href that contains the pathname, so a parent such as
 *  /wells isn't also current on /wells/projects. */
function currentHref(pathname: string, groups: AppShellNavGroup[]) {
  const matches = groups
    .flatMap((group) => hrefsOf(group.items))
    .filter((href) => isWithin(pathname, href))
  return matches.sort((a, b) => b.length - a.length)[0]
}

const defaultLink = (props: LinkProps) => <a {...props} />

const STORAGE_PREFIX = "app-shell-sidebar:"

/**
 * AppShell block — the frame for tool-style apps: a sidebar that collapses
 * to an icon rail, a top bar, a content area that scrolls on its own (so a
 * map can fill it), and an optional resizable side panel on the right.
 *
 * Pass the current `pathname` and, for client-side routing, `renderLink`:
 *
 *   <AppShell
 *     brand="Ocotillo"
 *     brandCollapsed="O"
 *     nav={NAV}
 *     pathname={location.pathname}
 *     renderLink={({ href, ...props }) => <Link to={href} {...props} />}
 *     header={<AppBreadcrumb />}
 *     actions={<UserMenu />}
 *   >
 *     <Outlet />
 *   </AppShell>
 *
 * Filter `nav` by the user's roles before passing it in. The sidebar's open
 * state is saved in localStorage under `storageKey`.
 */
export function AppShell({
  brand,
  brandCollapsed,
  brandHref = "/",
  nav,
  pathname,
  renderLink = defaultLink,
  header,
  actions,
  footer,
  footerNav,
  panel,
  panelTitle,
  storageKey = "app",
  children,
}: {
  brand: React.ReactNode
  /** Shown in the icon rail; defaults to nothing. */
  brandCollapsed?: React.ReactNode
  brandHref?: string
  nav: AppShellNavGroup[]
  pathname: string
  renderLink?: (props: LinkProps) => React.ReactElement
  /** Left side of the top bar, e.g. a breadcrumb. */
  header?: React.ReactNode
  /** Right side of the top bar, e.g. search and the user menu. */
  actions?: React.ReactNode
  /** Bottom of the sidebar, hidden in the icon rail: links, the version. */
  footer?: React.ReactNode
  /** Items pinned to the bottom of the sidebar that stay in the icon rail,
   *  e.g. "Get help" opening the panel. */
  footerNav?: AppShellNavItem[]
  /** Side panel content; open it with useAppShell().openPanel. */
  panel?: React.ReactNode
  panelTitle?: React.ReactNode
  storageKey?: string
  children: React.ReactNode
}) {
  const key = STORAGE_PREFIX + storageKey
  const [open, setOpen] = React.useState(() => localStorage.getItem(key) !== "false")
  const [panelOpen, setPanelOpen] = React.useState(false)
  const sidebarWasOpen = React.useRef(open)

  // Changes the user makes (toggle buttons, ⌘B) are saved; changes the shell
  // makes for the panel or a page aren't.
  const onOpenChange = (next: boolean) => {
    localStorage.setItem(key, String(next))
    setOpen(next)
  }

  // The panel takes the sidebar's room while it's open.
  const shell = React.useMemo<AppShellContextValue>(() => {
    const openPanel = () => {
      if (panelOpen) return
      sidebarWasOpen.current = open
      setOpen(false)
      setPanelOpen(true)
    }
    const closePanel = () => {
      if (!panelOpen) return
      setPanelOpen(false)
      if (sidebarWasOpen.current) setOpen(true)
    }
    return {
      panelOpen,
      openPanel,
      closePanel,
      togglePanel: panelOpen ? closePanel : openPanel,
      setSidebarOpenTemporarily: setOpen,
    }
  }, [panelOpen, open])

  const active = currentHref(pathname, [...nav, { items: footerNav ?? [] }])

  return (
    <AppShellContext.Provider value={shell}>
      <SidebarProvider open={open} onOpenChange={onOpenChange} className="h-svh overflow-hidden">
        <Sidebar collapsible="icon">
          <SidebarHeader className="h-14 flex-row items-center gap-2 border-b px-3 py-0 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
            <ShellBrand href={brandHref} renderLink={renderLink} collapsed={brandCollapsed}>
              {brand}
            </ShellBrand>
            <CollapseButton />
          </SidebarHeader>
          <SidebarContent className="overflow-x-hidden">
            {nav.map((group, index) => (
              <React.Fragment key={group.label ?? index}>
                {index > 0 && <SidebarSeparator className="mx-0" />}
                <SidebarGroup>
                  {group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
                  <SidebarGroupContent>
                    <NavMenu items={group.items} active={active} pathname={pathname} renderLink={renderLink} />
                  </SidebarGroupContent>
                </SidebarGroup>
              </React.Fragment>
            ))}
          </SidebarContent>
          {(footer || footerNav) && (
            <SidebarFooter className="gap-0 border-t p-0">
              {footer && (
                <div className="border-b px-4 py-3 text-sm group-data-[collapsible=icon]:hidden">
                  {footer}
                </div>
              )}
              {footerNav && (
                <div className="p-2">
                  <NavMenu items={footerNav} active={active} pathname={pathname} renderLink={renderLink} />
                </div>
              )}
            </SidebarFooter>
          )}
        </Sidebar>
        <SidebarInset className="min-w-0">
          <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background px-3">
            <ExpandButton />
            <div className="flex min-w-0 flex-1 items-center gap-2">{header}</div>
            {actions && <div className="flex shrink-0 items-center gap-1">{actions}</div>}
          </header>
          <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
        </SidebarInset>
        {panel && (
          <SidePanel open={panelOpen} title={panelTitle} onClose={shell.closePanel}>
            {panel}
          </SidePanel>
        )}
      </SidebarProvider>
    </AppShellContext.Provider>
  )
}

function ShellBrand({
  href,
  renderLink,
  collapsed,
  children,
}: {
  href: string
  renderLink: (props: LinkProps) => React.ReactElement
  collapsed?: React.ReactNode
  children: React.ReactNode
}) {
  const { state, isMobile } = useSidebar()
  const iconRail = state === "collapsed" && !isMobile
  if (iconRail && !collapsed) return null
  return renderLink({
    href,
    className: "flex min-w-0 items-center gap-2 font-heading font-bold text-sidebar-foreground",
    children: iconRail ? collapsed : children,
  })
}

/** In the sidebar header while it's open; shown on hover or focus. */
function CollapseButton() {
  const { state, isMobile, toggleSidebar } = useSidebar()
  if (state === "collapsed" && !isMobile) return null
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      onClick={toggleSidebar}
      aria-label="Collapse sidebar"
      title="Collapse sidebar (⌘B)"
      className={cn(
        "ml-auto text-muted-foreground hover:text-foreground",
        !isMobile && "opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
      )}
    >
      {isMobile ? <XIcon /> : <PanelLeftCloseIcon />}
    </Button>
  )
}

/** In the top bar: a menu button on phones, and an expand button on wider
 *  screens while the sidebar is collapsed. */
function ExpandButton() {
  const { state, isMobile, toggleSidebar } = useSidebar()
  if (!isMobile && state !== "collapsed") return null
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      onClick={toggleSidebar}
      aria-label={isMobile ? "Open navigation" : "Expand sidebar"}
      title={isMobile ? undefined : "Expand sidebar (⌘B)"}
      className="text-muted-foreground hover:text-foreground"
    >
      {isMobile ? <MenuIcon /> : <PanelLeftOpenIcon />}
    </Button>
  )
}

function NavMenu({
  items,
  active,
  pathname,
  renderLink,
}: {
  items: AppShellNavItem[]
  active: string | undefined
  pathname: string
  renderLink: (props: LinkProps) => React.ReactElement
}) {
  const { isMobile, setOpenMobile } = useSidebar()
  // On phones the sidebar is a sheet; close it once a page is picked.
  const onNavigate = () => {
    if (isMobile) setOpenMobile(false)
  }
  return (
    <SidebarMenu>
      {items.map((item) =>
        item.children?.length ? (
          <NavSection
            key={item.label}
            item={item}
            active={active}
            pathname={pathname}
            renderLink={renderLink}
            onNavigate={onNavigate}
          />
        ) : (
          <SidebarMenuItem key={item.label}>
            <NavButton item={item} active={active} renderLink={renderLink} onNavigate={onNavigate} />
          </SidebarMenuItem>
        )
      )}
    </SidebarMenu>
  )
}

/** A nav item as a link, or a button for actions and disabled items. Extra
 *  props (from a CollapsibleTrigger) go to the rendered element. */
function NavButton({
  item,
  active,
  renderLink,
  onNavigate,
  trailing,
  ...props
}: {
  item: AppShellNavItem
  active: string | undefined
  renderLink: (props: LinkProps) => React.ReactElement
  onNavigate: () => void
  trailing?: React.ReactNode
} & React.ComponentProps<"button">) {
  const { label, icon: Icon, href, onSelect, disabled } = item
  const shell = useAppShell()
  const content = (
    <>
      <Icon />
      <span>{label}</span>
      {trailing}
    </>
  )
  if (disabled || !href) {
    return (
      <SidebarMenuButton
        {...props}
        disabled={disabled}
        tooltip={disabled ? `${label} (coming soon)` : label}
        onClick={(event) => {
          props.onClick?.(event)
          onSelect?.(shell)
        }}
      >
        {content}
      </SidebarMenuButton>
    )
  }
  return (
    <SidebarMenuButton {...props} asChild isActive={active === href} tooltip={label}>
      {renderLink({
        href,
        "aria-current": active === href ? "page" : undefined,
        onClick: () => {
          onSelect?.(shell)
          onNavigate()
        },
        children: content,
      })}
    </SidebarMenuButton>
  )
}

function NavSection({
  item,
  active,
  pathname,
  renderLink,
  onNavigate,
}: {
  item: AppShellNavItem
  active: string | undefined
  pathname: string
  renderLink: (props: LinkProps) => React.ReactElement
  onNavigate: () => void
}) {
  const shell = useAppShell()
  const inSection = hrefsOf([item]).some((href) => isWithin(pathname, href))
  const [userOpen, setUserOpen] = React.useState(false)
  // Close a section the user opened once they navigate out of it.
  const [wasInSection, setWasInSection] = React.useState(inSection)
  if (wasInSection !== inSection) {
    setWasInSection(inSection)
    if (!inSection) setUserOpen(false)
  }
  const open = inSection || userOpen
  return (
    <Collapsible asChild open={open} onOpenChange={(next) => !inSection && setUserOpen(next)}>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <NavButton
            item={item}
            active={active}
            renderLink={renderLink}
            onNavigate={onNavigate}
            trailing={
              <ChevronRightIcon
                className={cn("ml-auto transition-transform", open && "rotate-90")}
              />
            }
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.children!.map((child) => (
              <SidebarMenuSubItem key={child.label}>
                {child.href && !child.disabled ? (
                  <SidebarMenuSubButton asChild isActive={active === child.href}>
                    {renderLink({
                      href: child.href,
                      "aria-current": active === child.href ? "page" : undefined,
                      onClick: onNavigate,
                      children: (
                        <>
                          <child.icon />
                          <span>{child.label}</span>
                        </>
                      ),
                    })}
                  </SidebarMenuSubButton>
                ) : (
                  // The sub-button renders a link by default; actions are buttons.
                  <SidebarMenuSubButton asChild>
                    <button
                      type="button"
                      disabled={child.disabled}
                      onClick={() => child.onSelect?.(shell)}
                    >
                      <child.icon />
                      <span>{child.label}</span>
                    </button>
                  </SidebarMenuSubButton>
                )}
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

const PANEL_MIN = 320
const PANEL_DEFAULT = 360
const PANEL_STEP = 16

/**
 * The right-hand panel: beside the content on wider screens, resizable by
 * dragging or with the arrow keys on its edge (up to half the window), and
 * over the content below the top bar on phones.
 */
function SidePanel({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean
  title?: React.ReactNode
  onClose: () => void
  children: React.ReactNode
}) {
  const { isMobile } = useSidebar()
  const [width, setWidth] = React.useState(PANEL_DEFAULT)
  const [dragging, setDragging] = React.useState(false)
  const titleId = React.useId()

  const clamp = (value: number) =>
    Math.min(Math.floor(window.innerWidth / 2), Math.max(PANEL_MIN, value))

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault()
    const startX = event.clientX
    const startWidth = width
    const target = event.currentTarget
    target.setPointerCapture(event.pointerId)
    setDragging(true)
    const onMove = (move: PointerEvent) => setWidth(clamp(startWidth + startX - move.clientX))
    const onUp = () => {
      setDragging(false)
      target.removeEventListener("pointermove", onMove)
      target.removeEventListener("pointerup", onUp)
    }
    target.addEventListener("pointermove", onMove)
    target.addEventListener("pointerup", onUp)
  }

  const body = (
    <section aria-labelledby={title ? titleId : undefined} className="flex h-full flex-col">
      <div className="flex h-14 shrink-0 items-center justify-between gap-2 border-b px-4">
        <h2 id={titleId} className="min-w-0 truncate text-sm font-semibold">
          {title}
        </h2>
        <Button type="button" variant="ghost" size="icon-sm" onClick={onClose} aria-label="Close panel">
          <XIcon />
        </Button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
    </section>
  )

  if (isMobile) {
    if (!open) return null
    return (
      <div className="fixed inset-x-0 top-14 bottom-0 z-40 border-t bg-background">{body}</div>
    )
  }

  return (
    <aside
      aria-hidden={!open}
      inert={!open}
      className={cn(
        "relative h-svh shrink-0 overflow-hidden border-l bg-background",
        !dragging && "transition-[width] duration-200 ease-in-out",
        !open && "border-l-0"
      )}
      style={{ width: open ? width : 0 }}
    >
      <div
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize panel"
        aria-valuenow={width}
        aria-valuemin={PANEL_MIN}
        tabIndex={open ? 0 : -1}
        onPointerDown={onPointerDown}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") setWidth((w) => clamp(w + PANEL_STEP))
          if (event.key === "ArrowRight") setWidth((w) => clamp(w - PANEL_STEP))
        }}
        className="absolute inset-y-0 left-0 z-10 w-1.5 cursor-col-resize transition-colors outline-none hover:bg-primary/20 focus-visible:bg-primary/40"
      />
      <div className="h-full" style={{ width }}>
        {body}
      </div>
    </aside>
  )
}
