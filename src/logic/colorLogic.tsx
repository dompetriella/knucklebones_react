import { PlayerColor } from "../models/PlayerColor";
import { PlayerColorEnum } from "../models/PlayerColorEnum";

// red

const white = "#FDF1E1";
const black = "#251605";

const red = "#EC4067";
const orange = "#E59D77";
const purple = "#B49FCC";

export function getColorByEnum(colorEnum: PlayerColorEnum | null): PlayerColor {
  switch (colorEnum) {
    case PlayerColorEnum.Red:
      return new PlayerColor(red, orange, purple, white, black, black);
    case PlayerColorEnum.Orange:
      return new PlayerColor(orange, red, purple, black, white, black);
    default:
      return new PlayerColor(red, orange, purple, white, black, black);
  }
}
