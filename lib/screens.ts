import type { ComponentType } from "react";
import OralScoreScreen from "@/components/screens/OralScoreScreen";
import TeethScreen from "@/components/screens/TeethScreen";
import GumBoneScreen from "@/components/screens/GumBoneScreen";
import PositiveReinforcementScreen from "@/components/screens/PositiveReinforcementScreen";
import NegativeReinforcementScreen from "@/components/screens/NegativeReinforcementScreen";
import AppointmentScreen from "@/components/screens/AppointmentScreen";

export type ScreenTint = "light" | "dark";

export type ScreenDef = {
  id: string;
  /** Which page indicator dot to highlight (0-indexed). */
  section: number;
  /** Light = white dots on dark gradient, Dark = dark dots on light bg. */
  tint: ScreenTint;
  Component: ComponentType;
};

export const TOTAL_SECTIONS = 4;

export const SCREENS: ScreenDef[] = [
  { id: "oral-score", section: 0, tint: "light", Component: OralScoreScreen },
  { id: "teeth", section: 1, tint: "dark", Component: TeethScreen },
  { id: "gum-bone", section: 2, tint: "dark", Component: GumBoneScreen },
  { id: "positive", section: 3, tint: "light", Component: PositiveReinforcementScreen },
  { id: "negative", section: 3, tint: "light", Component: NegativeReinforcementScreen },
  { id: "appointment", section: 3, tint: "light", Component: AppointmentScreen },
];
