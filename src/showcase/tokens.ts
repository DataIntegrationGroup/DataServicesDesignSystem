/** The color tokens in the theme contract (THEMING.md), by group and row;
 *  a `-soft` row sits under its solid colors. A swatch
 *  previews its text color: `-foreground` on a fill, `-strong` on a `-soft`
 *  tint. */
export const TOKEN_GROUPS = [
  { group: "Surfaces", rows: [["background", "card", "popover"]] },
  {
    group: "Brand",
    rows: [
      [
        "primary",
        "primary-light",
        "primary-dark",
        "secondary",
        "secondary-strong",
        "secondary-dark",
      ],
    ],
  },
  { group: "Neutral", rows: [["muted", "accent", "border", "input", "ring"]] },
  {
    group: "Status",
    rows: [
      ["destructive", "success", "warning", "info"],
      ["destructive-soft", "success-soft", "warning-soft", "info-soft"],
    ],
  },
  {
    group: "Category tones",
    rows: [
      ["tone-1", "tone-2", "tone-3", "tone-4", "tone-5", "tone-6"],
      [
        "tone-1-soft",
        "tone-2-soft",
        "tone-3-soft",
        "tone-4-soft",
        "tone-5-soft",
        "tone-6-soft",
      ],
    ],
  },
  {
    group: "Data",
    rows: [["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]],
  },
  {
    group: "Sidebar",
    rows: [["sidebar", "sidebar-primary", "sidebar-accent", "sidebar-border"]],
  },
] as const

export const SWATCH_TOKENS = TOKEN_GROUPS.flatMap((g) => g.rows.flat())
