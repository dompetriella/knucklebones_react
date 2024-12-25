export class MultiplayerRoom {
    id: number;
    roomCode: string;
    createdAt: Date;
  
    constructor({
      id,
      roomCode,
      createdAt = new Date(),
    }: {
      id: number;
      roomCode: string;
      createdAt?: Date;
    }) {
      this.id = id;
      this.roomCode = roomCode;
      this.createdAt = createdAt;
    }
  
    copyWith({
      id,
      roomCode,
      createdAt,
    }: {
      id?: number;
      roomCode?: string;
      createdAt?: Date;
    }): MultiplayerRoom {
      return new MultiplayerRoom({
        id: id ?? this.id,
        roomCode: roomCode ?? this.roomCode,
        createdAt: createdAt ?? this.createdAt,
      });
    }
  }
  