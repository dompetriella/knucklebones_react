import { DiceData } from "./DiceData";

export class MultiplayerRoom {
  id: number;
  roomCode: string;
  createdAt: Date;
  usableDice: DiceData | null;

  constructor({
    id,
    roomCode,
    createdAt = new Date(),
    usableDice = null,
  }: {
    id: number;
    roomCode: string;
    createdAt?: Date;
    usableDice?: DiceData | null;
  }) {
    this.id = id;
    this.roomCode = roomCode;
    this.createdAt = createdAt;
    this.usableDice = usableDice;
  }

  copyWith({
    id,
    roomCode,
    createdAt,
    usableDice,
  }: {
    id?: number;
    roomCode?: string;
    createdAt?: Date;
    usableDice?: DiceData | null;
  }): MultiplayerRoom {
    return new MultiplayerRoom({
      id: id ?? this.id,
      roomCode: roomCode ?? this.roomCode,
      createdAt: createdAt ?? this.createdAt,
      usableDice: usableDice ?? this.usableDice,
    });
  }
}
