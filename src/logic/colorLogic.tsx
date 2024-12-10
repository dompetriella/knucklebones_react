import { PlayerColor } from "../models/PlayerColor";
import { PlayerColorEnum } from "../models/PlayerColorEnum";

const white = "#FDF1E1";
const black = "#251605";

const red = "#EC4067";
const green = "#0A8754";
const orange = "#E59D77";
const purple = "#B49FCC";

export function getColorByEnum(colorEnum: PlayerColorEnum | null): PlayerColor {
  switch (colorEnum) {
    case PlayerColorEnum.Red:
      return new PlayerColor({
        primary: red,
        secondary: orange,
        tertiary: purple,
        onPrimary: white,
        onSecondary: black,
        onTertiary: white,
      });
    case PlayerColorEnum.Orange:
      return new PlayerColor({
        primary: orange,
        secondary: red,
        tertiary: green,
        onPrimary: black,
        onSecondary: white,
        onTertiary: black,
      });
    case PlayerColorEnum.Green:
      return new PlayerColor({
        primary: green,
        secondary: purple,
        tertiary: orange,
        onPrimary: white,
        onSecondary: black,
        onTertiary: white,
      });
    case PlayerColorEnum.Purple:
      return new PlayerColor({
        primary: purple,
        secondary: green,
        tertiary: red,
        onPrimary: black,
        onSecondary: white,
        onTertiary: black,
      });
    default:
      return new PlayerColor({
        primary: red,
        secondary: orange,
        tertiary: purple,
        onPrimary: white,
        onSecondary: black,
        onTertiary: black,
      });
  }
}
