# Contributing

Customized a component in your app and think other apps could use it?
Here's how it gets into the registry.

1. **Open an issue.** Use the "Propose a customization" template. Link
   the PR in your app and say why the change is useful. Keep shipping it
   in your app in the meantime.
2. **The owners review it** at sprint planning or on their own cadence.
   They ask one question: would another app use this? If yes, someone
   picks it up, usually whoever wrote it, and opens a PR here with
   `Closes #<issue>`.
   If no, the owners close the issue with a short reason.
3. **File a sync ticket.** Once the PR merges, file a ticket in the
   original app's Jira backlog to swap its copy for the registry version.
   Other apps that want the change file their own ticket.

## Porting a change

Follow [Change the registry](README.md#change-the-registry), plus three
rules:

- Make new behavior opt-in with a prop, so apps don't change when they
  sync. Change a default only when the owners decide every app should
  get it.
- Take out anything specific to your app (endpoints, data shapes, copy)
  and pass it in as props.
- Don't edit upstream shadcn components in `src/components/ui/`. Wrap
  them in a new item instead.

## Syncing an app

In the app, preview the update, then apply it:

```bash
pnpm dlx shadcn@latest add @dataservices/<item> --dry-run --diff
pnpm dlx shadcn@latest add @dataservices/<item> --overwrite
```

`--overwrite` replaces local edits to that file. Delete the app's old
copy of the component and point its imports at the registry one.
