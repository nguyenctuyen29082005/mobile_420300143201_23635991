# Exercise 3 — Image resilience (CourseCard)

This document explains how `CourseCard` handles images without blocking course tasks.

## Principle

**Task completion never depends on the image.** Every card always renders course code, title, description, instructor, and an enabled “Xem chi tiết khóa học” action — regardless of image load outcome.

## Cases implemented

| Demo tag | Source type | State / role | Behavior |
|----------|-------------|--------------|----------|
| Local image | `require('@/assets/...')` | Informative | Bundled asset loads offline; `accessibilityLabel` describes the image. |
| Remote image | `{ uri: 'https://...' }` | Informative | Network fetch with BlurHash placeholder and transition. |
| Loading state | Remote + `deferSourceMs` | Informative | Source attached after delay; overlay shows spinner and status text until `onLoad`. |
| Failed image | Invalid remote URI | Informative → fallback | `onError` shows fallback panel; course content and action remain available. |
| Informative image | Local asset | Informative | `accessible: true` + `accessibilityLabel` for screen readers / web `alt`. |
| Decorative image | Local asset | Decorative | `accessible: false`, hidden from accessibility tree; course text carries meaning. |

## State machine

```
idle / loading ──onLoad──► loaded
       │
       └──onError──► failed (fallback UI, no broken image chrome)
```

- **`onLoadStart`** → `loading` (spinner overlay)
- **`onLoad`** → `loaded` (overlay removed)
- **`onError`** → `failed` (friendly message; image view not rendered)

`deferSourceMs` on the loading demo keeps `resolvedSource` null briefly so the loading overlay is reliably visible during review.

## Layout decisions

- **Fixed aspect ratio (`16:9`) on `imageFrame`, not on text** — reserves space for media but lets copy grow vertically without clipping.
- **Overlays use `absoluteFill`** — loading/failed states sit above the frame without shifting course metadata.
- **BlurHash placeholder** — remote images show a lightweight preview while bytes download (`placeholderContentFit: 'cover'` matches final `contentFit`).
- **Action button outside `imageFrame`** — registration/view flow is structurally independent of image success.

## Accessibility

| Role | Props | Rationale |
|------|-------|-----------|
| Informative | `accessible`, `accessibilityLabel`, `accessibilityRole: 'image'` | Image conveys course context; label is required. |
| Decorative | `accessible: false`, `accessibilityElementsHidden`, `importantForAccessibility: 'no-hide-descendants'` | Pure ornament; screen readers focus on text. |
| Failed | Same as decorative for the `<Image>` node | Broken media must not pollute screen reader output. |

Loading and failure messages use visible text plus `accessibilityLiveRegion="polite"` on overlays.

## Files

- `CourseCard.tsx` — resilient image shell + course content
- `course-image-demos.tsx` — six demo configurations + `CourseCardGallery`
- `CampusDashboard.tsx` — renders gallery in the courses section

## Verification checklist

- [ ] Local card shows React logo without network.
- [ ] Remote card loads from URL or shows failure without crashing.
- [ ] Loading card displays spinner before image appears.
- [ ] Failed card shows fallback message; “Xem chi tiết khóa học” still works.
- [ ] Informative card exposes a meaningful `accessibilityLabel`.
- [ ] Decorative card is ignored by assistive tech (text still readable).
