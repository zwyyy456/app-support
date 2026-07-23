# app-support

Static product, privacy, support, and license pages for Hyperseek apps.

## Structure

- `flashdict/` → `flashdict.hyperseek.tech`
- `zendo/` → `zendo.hyperseek.tech`

Each directory is an independent static Vercel project.

## Vercel

Create two Vercel projects from this repository:

| Project | Root Directory | Domain |
| --- | --- | --- |
| `app-support-flashdict` | `flashdict` | `flashdict.hyperseek.tech` |
| `app-support-zendo` | `zendo` | `zendo.hyperseek.tech` |

For both projects:

- Framework Preset: `Other`
- Build Command: empty
- Output Directory: `.`

Routes use extensionless URLs through each directory's `vercel.json`:

- `/privacy`
- `/support`
- `/licenses` (FlashDict)

