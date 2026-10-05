/** A page section's id from its title: "Icon sizes" → "icon-sizes". Demo
 *  titles become section ids, so scripts/check-showcase.ts uses this too. */
export const sectionId = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
