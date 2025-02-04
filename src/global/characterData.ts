import { getColorByEnum } from "../logic/colorLogic";
import Character from "../models/Character";
import { PlayerColorEnum } from "../models/PlayerColorEnum";

export const characterDataList = [
  new Character({
    index: 0,
    characterName: "Axel",
    characterImagePath: "animations/axel.riv",
    characterImageAlt: "a red axolotl",
    color: getColorByEnum(PlayerColorEnum.Red),
  }),

  new Character({
    index: 1,
    characterName: "Foxanne",
    characterImagePath: "animations/frobert.riv",
    characterImageAlt: "a orange fox",
    color: getColorByEnum(PlayerColorEnum.Orange),
  }),

  new Character({
    index: 2,
    characterName: "Frobert",
    characterImagePath: "animations/frobert.riv",
    characterImageAlt: "a green frog",
    color: getColorByEnum(PlayerColorEnum.Green),
  }),

  new Character({
    index: 3,
    characterName: "Batrick",
    characterImagePath: "animations/frobert.riv",
    characterImageAlt: "a purple bat",
    color: getColorByEnum(PlayerColorEnum.Purple),
  }),
];
