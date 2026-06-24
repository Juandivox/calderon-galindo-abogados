# Powered by MirayLabs — Footer Badge Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the MirayLabs "Powered by" badge (cat logo + text link) to the footer of `calderon-galindo-abogados`, replicating the hover animation and click behavior from `loki-legal`.

**Architecture:** Copy the existing MirayLabs WebP logo asset from `loki-legal` into this project's `public/` folder, then extend the current `Footer.jsx` bottom bar to include the badge as an external anchor link. The badge uses Tailwind `group-hover` transitions — text brightens on hover and the inverted logo gains brightness — matching the source implementation.

**Tech Stack:** React 18, React Router DOM, Tailwind CSS 3.4, Vite 5.

---

## File Structure

| File | Action | Purpose |
|------|--------|---------|
| `public/miraylabs-logo.webp` | Create (copy from `E:\Repos\MirayRepos\loki-legal\public\miraylabs-logo.webp`) | MirayLabs cat logo asset used by the footer badge. |
| `src/components/layout/Footer.jsx` | Modify | Add the "Powered by MirayLabs" anchor link in the footer bottom bar, preserving existing copyright text. |

---

### Task 1: Copy the MirayLabs logo asset

**Files:**
- Create: `public/miraylabs-logo.webp`
- Source: `E:\Repos\MirayRepos\loki-legal\public\miraylabs-logo.webp`

- [ ] **Step 1: Copy the logo file**

Copy the existing logo from the `loki-legal` repository into this project's public directory:

```powershell
Copy-Item -LiteralPath "E:\Repos\MirayRepos\loki-legal\public\miraylabs-logo.webp" -Destination "E:\Repos\MirayRepos\calderon-galindo-abogados\public\miraylabs-logo.webp"
```

- [ ] **Step 2: Verify the file exists and is accessible**

Run:

```powershell
Test-Path -LiteralPath "E:\Repos\MirayRepos\calderon-galindo-abogados\public\miraylabs-logo.webp"
```

Expected output: `True`

- [ ] **Step 3: Commit**

```bash
git add public/miraylabs-logo.webp
git commit -m "assets: add MirayLabs logo for footer badge"
```

---

### Task 2: Add the "Powered by MirayLabs" badge to the footer

**Files:**
- Modify: `src/components/layout/Footer.jsx:55-59`

- [ ] **Step 1: Replace the footer bottom bar**

The current footer bottom bar is a single centered copyright paragraph. Replace it with a two-column layout that keeps the copyright on the left and places the MirayLabs badge on the right (stacked on mobile).

Replace this block in `src/components/layout/Footer.jsx`:

```jsx
        <div className="mt-12 border-t border-blanco-puro/10 pt-6 text-center">
          <p className="font-cuerpo text-xs text-blanco-puro/50">
            © {new Date().getFullYear()} Calderón Galindo Abogados. Todos los derechos reservados.
          </p>
        </div>
```

With:

```jsx
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-blanco-puro/10 pt-6 sm:flex-row">
          <p className="font-cuerpo text-xs text-blanco-puro/50">
            © {new Date().getFullYear()} Calderón Galindo Abogados. Todos los derechos reservados.
          </p>
          <a
            href="https://miraylabs.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 transition-all duration-300"
          >
            <span className="font-cuerpo text-[10px] uppercase tracking-widest text-blanco-puro/60 transition-colors duration-300 group-hover:text-blanco-puro">
              Powered by
            </span>
            <img
              src="/miraylabs-logo.webp"
              alt="MirayLabs"
              width={40}
              height={40}
              className="object-contain invert brightness-75 transition-all duration-300 group-hover:brightness-200"
            />
          </a>
        </div>
```

- [ ] **Step 2: Verify no imports are missing**

`Footer.jsx` already imports `Link` and `lucide-react` icons. No new imports are required for the badge because it uses a plain `<a>` tag and `<img>`.

- [ ] **Step 3: Start the dev server and visually inspect**

Run:

```bash
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173/`). Scroll to the footer and verify:

1. The "Powered by" text appears to the left of the cat logo.
2. The logo is visible against the dark footer background.
3. Hovering over the badge brightens the text and the logo.
4. Clicking the badge opens `https://miraylabs.com/` in a new tab.

- [ ] **Step 4: Build the project to ensure no errors**

Run:

```bash
npm run build
```

Expected: Vite builds successfully with no errors and `dist/miraylabs-logo.webp` is present in the output.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Footer.jsx
git commit -m "feat(footer): add Powered by MirayLabs badge with hover animation"
```

---

## Design Notes

- The logo file is a purple cat on a transparent background. In `loki-legal` it is displayed with `invert` so it appears light against the dark footer; the same approach is used here.
- `brightness-75` dims the logo in its resting state; `group-hover:brightness-200` brightens it on hover.
- The text uses `text-blanco-puro/60` at rest and `group-hover:text-blanco-puro` on hover, matching the source color transition.
- `transition-all duration-300` is applied to both the anchor and the inner elements so the hover state animates smoothly.
- The layout stacks vertically on mobile (`flex-col`) and spreads horizontally on small screens and up (`sm:flex-row`).

---

## Self-Review

**1. Spec coverage:**
- Copy logo from `loki-legal` → Task 1.
- Place it in the footer → Task 2.
- Same animation (hover brightness/color transition) → Task 2, Step 1.
- Click opens MirayLabs site → Task 2, Step 1 (`href="https://miraylabs.com/"`, `target="_blank"`).

**2. Placeholder scan:** No TBD, TODO, or vague instructions. All code, commands, and file paths are explicit.

**3. Type consistency:** No TypeScript in this project. JSX uses standard React attribute names (`className`, `href`, `target`, `rel`, `src`, `alt`, `width`, `height`).

---

## Execution Handoff

Plan complete and saved to `docs/06-powered-by-miraylabs.md`. Two execution options:

**1. Subagent-Driven (recommended)** — Dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach would you like?
