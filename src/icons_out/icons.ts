export type IconsId =
  | "arrow-100"
  | "arrow-200"
  | "arrow-300"
  | "bug"
  | "minus"
  | "plus";

export type IconsKey =
  | "Arrow_100"
  | "Arrow_200"
  | "Arrow_300"
  | "Bug"
  | "Minus"
  | "Plus";

export enum Icons {
  Arrow_100 = "arrow-100",
  Arrow_200 = "arrow-200",
  Arrow_300 = "arrow-300",
  Bug = "bug",
  Minus = "minus",
  Plus = "plus",
}

export const ICONS_CODEPOINTS: { [key in Icons]: string } = {
  [Icons.Arrow_100]: "61697",
  [Icons.Arrow_200]: "61698",
  [Icons.Arrow_300]: "61699",
  [Icons.Bug]: "61700",
  [Icons.Minus]: "61701",
  [Icons.Plus]: "61702",
};
