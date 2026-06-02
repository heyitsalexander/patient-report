# Patient Report — Stories-style demo

An Instagram-Stories style swipeable patient dental report built from the
[Figma file](https://www.figma.com/design/Q5yrRaCjf3121Lnj2j5aQU/Patient-report-splash-screens),
with animated transitions and synthesized audio feedback.

## Highlights

- **Vertical swipe / tap / arrow-key / wheel navigation** between 6 screens
- **Animated Oral Score** — the dial fills from 58 → 70 while the background
  cross-fades from a high-risk red gradient to a moderate-risk orange gradient.
  Paired with an ascending chime synthesized via the Web Audio API.
- **Animated reinforcement charts** — the polyline draws in left-to-right,
  then a dashed projection animates **up** (positive) or **down** (negative),
  each with a matching musical cue.
- **Magazine-stack calendar card** with two layered shadow cards for the
  appointment screen.
- **Synthesized sounds** — no asset files; ascending arpeggio + sweep for
  upward motion, descending arpeggio + sweep for downward motion.

## Run

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Controls

| Action | Result |
|---|---|
| Swipe up / down | Next / previous screen |
| Arrow keys | Same |
| Tap top half / bottom half | Previous / next |
| Space | Next |
| Mouse wheel | Scroll-paginated |

## Stack

- Next.js 16 (App Router, Turbopack)
- Tailwind CSS v4
- [Motion](https://motion.dev) (Framer Motion successor) for spring/path animations
- Web Audio API for synthesized sound effects

## Project structure

```
app/                  Next.js routes & layout
  page.tsx            Mounts the phone frame + stories container
  layout.tsx
  globals.css
components/
  PhoneFrame.tsx      Device-style centered frame
  StoriesContainer.tsx Swipe / keyboard / wheel navigation, AnimatePresence
  ProgressDots.tsx    Stretching pill indicator
  screens/
    OralScoreScreen.tsx           Score 58→70 + red→orange transition
    TeethScreen.tsx               Dental chart (Figma render as bg)
    GumBoneScreen.tsx             Perio chart (Figma render as bg)
    PositiveReinforcementScreen.tsx  Upward line animation + ascending sound
    NegativeReinforcementScreen.tsx  Downward line animation + descending sound
    AppointmentScreen.tsx         Calendar card + CTAs
lib/
  screens.ts          Screen registry & dot-section mapping
  sound.ts            Web Audio API synthesizer (playUp / playDown / playScoreRise / playTick)
public/designs/       Figma exports used as static backgrounds for some screens
```
