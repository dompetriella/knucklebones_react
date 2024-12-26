import { getColorByEnum } from "../logic/colorLogic";
import Character from "../models/Character";
import { PlayerColorEnum } from "../models/PlayerColorEnum";

export const characterDataList = [
  new Character({
    characterName: "Axel",
    characterImagePath: "RedPlayer.svg",
    characterImageAlt: "a red axolotl",
    color: getColorByEnum(PlayerColorEnum.Red)
  }),

  new Character({
    characterName: "Foxanne",
    characterImagePath: "OrangePlayer.svg",
    characterImageAlt: "a orange fox",
    color: getColorByEnum(PlayerColorEnum.Orange)
  }),

  new Character({
    characterName: "Frobert",
    characterImagePath: "GreenPlayer.svg",
    characterImageAlt: "a green frog",
    color: getColorByEnum(PlayerColorEnum.Green)
  }),

  new Character({
    characterName: "Batrick",
    characterImagePath: "PurplePlayer.svg",
    characterImageAlt: "a purple bat",
    color: getColorByEnum(PlayerColorEnum.Purple)
  }),

];