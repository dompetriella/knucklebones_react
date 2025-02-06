import { PlayerColor } from "./PlayerColor";

class Character {
  characterName: string;
  characterImagePath: string;
  characterImageAlt: string;
  color: PlayerColor;
  index: number;
  animationTrigger: string;

  constructor({
    characterName,
    characterImagePath,
    characterImageAlt,
    color,
    index,
    animationTrigger = "", // Default to ""
  }: {
    characterName: string;
    characterImagePath: string;
    characterImageAlt: string;
    color: PlayerColor;
    index: number;
    animationTrigger?: string; // No specific string options, just a plain string
  }) {
    this.characterName = characterName;
    this.characterImagePath = characterImagePath;
    this.characterImageAlt = characterImageAlt;
    this.color = color;
    this.index = index;
    this.animationTrigger = animationTrigger;
  }

  copyWith({
    characterName,
    characterImagePath,
    characterImageAlt,
    color,
    index,
    animationTrigger,
  }: {
    characterName?: string;
    characterImagePath?: string;
    characterImageAlt?: string;
    color?: PlayerColor;
    index?: number;
    animationTrigger?: string;
  }): Character {
    return new Character({
      characterName: characterName ?? this.characterName,
      characterImagePath: characterImagePath ?? this.characterImagePath,
      characterImageAlt: characterImageAlt ?? this.characterImageAlt,
      color: color ?? this.color,
      index: index ?? this.index,
      animationTrigger: animationTrigger ?? this.animationTrigger,
    });
  }
}

export default Character;
