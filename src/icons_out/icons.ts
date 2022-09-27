export type IconsId =
  | "arrow-200"
  | "arrow-300"
  | "bug"
  | "calendar"
  | "checkmark"
  | "clip"
  | "cross"
  | "minus"
  | "plus"
  | "printer";

export type IconsKey =
  | "Arrow_200"
  | "Arrow_300"
  | "Bug"
  | "Calendar"
  | "Checkmark"
  | "Clip"
  | "Cross"
  | "Minus"
  | "Plus"
  | "Printer";

export enum Icons {
  Arrow_200 = "arrow-200",
  Arrow_300 = "arrow-300",
  Bug = "bug",
  Calendar = "calendar",
  Checkmark = "checkmark",
  Clip = "clip",
  Cross = "cross",
  Minus = "minus",
  Plus = "plus",
  Printer = "printer",
}

export const ICONS_CODEPOINTS: { [key in Icons]: string } = {
  [Icons.Arrow_200]: "61697",
  [Icons.Arrow_300]: "61698",
  [Icons.Bug]: "61699",
  [Icons.Calendar]: "61700",
  [Icons.Checkmark]: "61701",
  [Icons.Clip]: "61702",
  [Icons.Cross]: "61703",
  [Icons.Minus]: "61704",
  [Icons.Plus]: "61705",
  [Icons.Printer]: "61706",
};
