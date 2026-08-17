# Exercise 2 — Layout decisions (Text stress test)

This document explains how the Smart Campus UI handles long translated strings, larger text, and wrapping without fixed heights.

## Goals

- Stress-test the layout with longer Vietnamese copy at every label and heading.
- Increase readable text size across dashboard, card, and info rows.
- Remove constraints that prevent natural line wrapping.
- Keep the screen scrollable when content grows vertically.

## Removed constraints

| Before | After | Why |
|--------|-------|-----|
| `InfoRow` label `width: 100` | `flex: 0.42` + `minWidth: 0` | Fixed width forced premature wrapping and could clip long labels. |
| `InfoRow` `alignItems: "center"` | `alignItems: "flex-start"` | Multi-line label/value pairs stay top-aligned instead of vertically centering uneven blocks. |
| Implicit default text sizes (~14–16) | Explicit 18–28 with `lineHeight` | Larger type needs line height so wrapped lines do not collide. |

No component in this exercise uses a fixed **height** on text containers. Vertical space is content-driven.

## InfoRow (label / value)

```
[ label (~42% flex) ] [ gap ] [ value (remaining flex) ]
```

- **Row direction:** horizontal on all breakpoints; both columns share one row so the stress test exposes real wrapping pressure.
- **Label column:** `flex: 0.42`, `minWidth: 0` — takes ~42% of row width and may wrap across multiple lines.
- **Value column:** `flex: 1`, `minWidth: 0`, `flexShrink: 1` — uses remaining space and wraps freely.
- **`minWidth: 0`:** required in React Native flex layouts so children can shrink below intrinsic text width and wrap instead of overflowing.
- **`gap: 12`:** spacing between columns without margin hacks on individual `Text` nodes.
- **`lineHeight`:** 26 at `fontSize` 18 keeps wrapped lines readable.

## StudentCard

- **Title:** full-width centered text with `lineHeight: 30`; no height cap — title grows with lines.
- **Card width:** `width: "100%"` + `maxWidth: 400` limits horizontal stretch on tablets/web while still allowing vertical growth.
- **Shadow `height` in `shadowOffset`:** visual effect only, not a layout height on the view.

## CampusDashboard

- **ScrollView:** primary overflow strategy when headers, sections, and button copy stack taller than the viewport.
- **Sections:** `width: "100%"` with padding and `gap`; each `Text` node wraps naturally — no per-row height.
- **Button:** `Pressable` height follows padded content; button label uses `textAlign: "center"` so long CTA strings wrap on narrow screens.

## Typography scale (Exercise 2)

| Element | fontSize | lineHeight |
|---------|----------|------------|
| Dashboard header | 28 | 36 |
| Section title | 20 | 28 |
| Body / InfoRow / button | 18 | 26 |
| Card title | 22 | 30 |

## Files touched

- `InfoRow.tsx` — flex-based columns, wrapping fixes
- `StudentCard.tsx` — long labels/values, larger title
- `CampusDashboard.tsx` — long copy, shared body styles, larger headings
- `index.tsx` — unchanged; renders `CampusDashboard` inside `flex: 1` shell

## Verification checklist

- [ ] Long labels in `InfoRow` wrap without overlapping values.
- [ ] Emphasized major field remains bold and fully visible.
- [ ] Dashboard scrolls when content exceeds screen height.
- [ ] Button label wraps on narrow devices without clipping.
- [ ] No layout relies on a fixed view height for text blocks.
