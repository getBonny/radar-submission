/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

type ColorValue = string;
type TailwindColor = keyof typeof Colors.tailwind;
type TailwindShade = keyof typeof Colors.tailwind.neutral;

export type ColorProp =
  | ColorValue
  | { group: TailwindColor; shade: TailwindShade };

export const getColor = (color: ColorProp): string => {
  if (typeof color === "string") {
    return color;
  }
  return Colors.tailwind[color.group][color.shade];
};

export const Colors = {
  tailwind: {
    slate: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
      950: "#020617",
    },
    neutral: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#E5E5E5",
      300: "#D4D4D4",
      400: "#A3A3A3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
      950: "#0A0A0A",
    },
    blue: {
      50: "#EFF6FF",
      100: "#DBEAFE",
      200: "#BFDBFE",
      300: "#93C5FD",
      400: "#60A5FA",
      500: "#3B82F6",
      600: "#2563EB",
      700: "#1D4ED8",
      800: "#1E40AF",
      900: "#1E3A8A",
      950: "#172554",
    },
    purple: {
      50: "#faf5ff",
      100: "#f3e8ff",
      200: "#e9d5ff",
      300: "#d8b4fe",
      400: "#c084fc",
      500: "#a855f7",
      600: "#9333ea",
      700: "#7e22ce",
      800: "#6b21a8",
      900: "#581c87",
      950: "#3b0764",
    },
    yellow: {
      50: "#FFFBEA",
      100: "#FEFCE8",
      200: "#FEF9C3",
      300: "#FEF08A",
      400: "#FDE047",
      500: "#FACC15",
      600: "#EAB308",
      700: "#CA8A04",
      800: "#A16207",
      900: "#854D0E",
      950: "#422006",
    },
    orange: {
      300: "#fdba74",
      400: "#fbbf24",
      500: "#f97316",
      600: "#ea580c",
      700: "#c2410c",
      800: "#9a3412",
      900: "#7c2f1b",
      950: "#431407",
    },
    green: {
      50: "#F0FDF4",
      100: "#DCFCE7",
      200: "#BBF7D0",
      300: "#86EFAC",
      400: "#4ADE80",
      500: "#22C55E",
      600: "#16A34A",
      700: "#16A34A",
      800: "#16A34A",
      900: "#16A34A",
      950: "#16A34A",
    },
  },
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};
