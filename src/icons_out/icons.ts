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
  | "printer"
  | "star"
  | "telegram"
  | "tiktok"
  | "twitter"
  | "vk"
  | "yandexdzen"
  | "youtube";

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
  | "Printer"
  | "Star"
  | "Telegram"
  | "Tiktok"
  | "Twitter"
  | "Vk"
  | "Yandexdzen"
  | "Youtube";

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
  Star = "star",
  Telegram = "telegram",
  Tiktok = "tiktok",
  Twitter = "twitter",
  Vk = "vk",
  Yandexdzen = "yandexdzen",
  Youtube = "youtube",
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
  [Icons.Star]: "61707",
  [Icons.Telegram]: "61708",
  [Icons.Tiktok]: "61709",
  [Icons.Twitter]: "61710",
  [Icons.Vk]: "61711",
  [Icons.Yandexdzen]: "61712",
  [Icons.Youtube]: "61713",
};
