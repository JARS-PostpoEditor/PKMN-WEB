# Pokémon Capture & Damage Calculators - Design Guidelines

## Design Approach

**Reference-Based Approach:** Drawing inspiration from modern game utility tools (Bulbapedia, Smogon calculators) combined with Nintendo's clean, playful aesthetic. The design balances serious functionality with Pokémon's approachable, game-like feel.

**Core Principle:** Create a professional calculator tool that feels native to the Pokémon universe - clean data presentation with subtle playful touches.

---

## Typography System

**Primary Font:** "Poppins" (Google Fonts) - rounded, friendly, modern
**Secondary Font:** "Inter" (Google Fonts) - clean readability for data

**Hierarchy:**
- Page Title/Logo: Poppins Bold, 2.5rem (text-4xl)
- Section Headers: Poppins Semibold, 1.75rem (text-3xl)
- Calculator Labels: Poppins Medium, 0.875rem (text-sm), uppercase, tracking-wide
- Input Fields: Inter Regular, 1rem (text-base)
- Results/Output: Poppins Semibold, 1.5rem (text-2xl)
- Body Text: Inter Regular, 0.875rem (text-sm)
- Helper Text: Inter Regular, 0.75rem (text-xs)

---

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16 (e.g., p-4, gap-8, mb-12)

**Container Structure:**
- Max-width: max-w-7xl centered with mx-auto
- Page padding: px-4 on mobile, px-8 on desktop
- Section spacing: py-12 (mobile) to py-16 (desktop)

**Grid System:**
- Calculator inputs: Single column on mobile, 2-column grid (grid-cols-2) on tablet+
- Type chart: Responsive grid adapting from mobile scroll to full table on desktop
- Dashboard cards: grid-cols-1 md:grid-cols-3 for three main tools

---

## Component Library

### Navigation & Layout

**Header:**
- Sticky top navigation with subtle shadow
- Logo/title on left (Poké Ball icon + "Pokémon Calculators" text)
- Tab navigation for Capture/Damage/Type Chart (pill-style buttons, rounded-full)
- Height: h-16, items-center flex justify-between
- Padding: px-6

**Tab System:**
- Horizontal tabs below header on desktop
- Pills with rounded-full borders
- Active tab: filled background, inactive: outline style
- Spacing: gap-2, px-6 py-2

### Forms & Inputs

**Input Groups:**
- Label above input, mb-2
- Labels: text-sm font-medium, uppercase tracking-wide
- Inputs: rounded-lg border-2, h-12, px-4
- Focus state: ring-4 ring-opacity-50
- Helper text below: text-xs, mt-1

**Select Dropdowns:**
- Custom styled select with chevron icon
- Same sizing as text inputs (h-12)
- Rounded-lg with border-2

**Sliders:**
- HP damage slider: full-width with clear min/max labels
- Track height: h-2, rounded-full
- Thumb: w-5 h-5 rounded-full with shadow-md

**Radio/Checkbox Groups:**
- Stacked vertically with gap-3
- Custom styled with Poké Ball checkmarks
- Label padding: pl-8, py-2

### Calculator Output Cards

**Result Display:**
- Large prominent card with rounded-xl and shadow-lg
- Padding: p-8
- Main result number: text-5xl font-bold, text-center
- Visual gauge below number: full-width progress bar, h-4, rounded-full
- Breakdown section: mt-6, divide-y divide with gap-3

**Modifier Breakdown:**
- Each modifier row: flex justify-between items-center
- Icon + label on left, multiplier value on right
- Icons: w-5 h-5 inline
- Spacing: py-2

### Type Chart

**Desktop Table:**
- Sticky header row and first column
- Cell size: w-12 h-12 for multiplier cells
- Hover effects: scale-110 transition
- Type badges: rounded-md px-2 py-1, text-xs font-bold

**Mobile Grid:**
- Attack type selector dropdown at top
- Grid of defense types: grid-cols-3 gap-2
- Each cell: aspect-square, rounded-lg, flex items-center justify-center

### Data Display Components

**Damage Range Box:**
- Two-column layout: Min | Max
- Each value: text-4xl font-bold, text-center
- Separator: border-r-2 between columns
- "Hits to KO" below: text-lg, opacity-75

**Effectiveness Badges:**
- Inline badges with rounded-full
- Text: text-xs font-semibold uppercase tracking-wide
- Padding: px-3 py-1
- Icons for ×0, ×0.5, ×1, ×2, ×4 multipliers

### Buttons

**Primary Action:**
- Rounded-lg with shadow-md
- Size: px-8 py-3, text-base font-semibold
- Full-width on mobile, auto on desktop

**Secondary Actions:**
- Outline style with border-2
- Same sizing as primary
- Rounded-lg

---

## Interactive Elements

**Pokémon Species Search:**
- Autocomplete dropdown with type-ahead
- Shows sprite thumbnail + name in dropdown items
- Dropdown items: flex items-center gap-3, py-2 px-3
- Sprite size: w-8 h-8

**Ball Selection:**
- Visual grid of Poké Balls: grid-cols-3 md:grid-cols-4 gap-4
- Each ball: Card with sprite icon, name, multiplier description
- Selected state: border-4 with scale-105
- Size: p-4, rounded-xl

---

## Animations

**Minimal, purposeful animations only:**
- Calculator result: Fade-in with scale (0.95 → 1) over 200ms
- Tab switching: Crossfade transition, 150ms
- Type chart cell hover: Scale 1.05, 100ms
- Progress bar fill: Smooth width transition over 500ms

---

## Responsive Breakpoints

**Mobile (< 768px):**
- Single column layouts
- Full-width inputs
- Stacked calculator sections
- Type chart as scrollable grid

**Tablet (768px - 1024px):**
- 2-column calculator inputs
- Side-by-side input/output sections
- Expanded type chart table

**Desktop (> 1024px):**
- 3-column dashboard layout
- Split-screen calculator (inputs left, results right)
- Full type chart table with hover highlights

---

## Images

**Header Logo:** Poké Ball icon (64×64px) - use official sprite or high-quality icon
**Ball Selection Grid:** Sprite icons for each Poké Ball type (48×48px each)
**Pokémon Species Autocomplete:** Pokémon sprites (32×32px thumbnails in dropdown)
**Type Icons:** 18 type badge icons (fire, water, grass, etc.) for type chart (24×24px)

**No hero image** - This is a utility tool focused on immediate functionality.

---

## Accessibility

- All form inputs: proper labels with for/id association
- ARIA labels for icon-only buttons
- Keyboard navigation: Tab order through calculators, Enter to calculate
- Focus indicators: 4px ring on all interactive elements
- Screen reader announcements for calculation results
- Color-blind friendly type chart with pattern overlays or text labels