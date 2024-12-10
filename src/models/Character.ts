import { PlayerColor } from "./PlayerColor";

class Character {
  characterName: string;
  characterImagePath: string;
  characterImageAlt: string;
  color: PlayerColor;

  constructor({
    characterName,
    characterImagePath,
    characterImageAlt,
    color,
  }: {
    characterName: string;
    characterImagePath: string;
    characterImageAlt: string;
    color: PlayerColor;
  }) {
    this.characterName = characterName;
    this.characterImagePath = characterImagePath;
    this.characterImageAlt = characterImageAlt;
    this.color = color;
  }
}

export default Character;
