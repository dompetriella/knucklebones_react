import { PlayerColor } from "./PlayerColor";

class Character {
  characterName: string;
  characterImagePath: string;
  characterImageAlt: string;
  color: PlayerColor;
  index: number;

  constructor({
    characterName,
    characterImagePath,
    characterImageAlt,
    color,
    index,
  }: {
    characterName: string;
    characterImagePath: string;
    characterImageAlt: string;
    color: PlayerColor;
    index: number;
  }) {
    this.characterName = characterName;
    this.characterImagePath = characterImagePath;
    this.characterImageAlt = characterImageAlt;
    this.color = color;
    this.index = index;
  }
}

export default Character;
