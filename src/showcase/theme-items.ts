import registry from "../../registry.json"

export const THEMES = registry.items.filter(
  (item) => item.type === "registry:theme"
)
