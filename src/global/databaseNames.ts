export class DatabaseTableNames {
  static readonly KnucklebonesRooms = class {
    static readonly TableName = "knucklebones_rooms";
    static readonly Id = "id";
    static readonly RoomCode = "room_code";
    static readonly CreatedAt = "created_at";
  };

  static readonly KnucklebonesPlayers = class {
    static readonly TableName = "knucklebones_players";
    static readonly Id = "id";
    static readonly RoomId = "room_id";
    static readonly PlayerId = "player_id";
    static readonly CreatedAt = "created_at";
    static readonly PlayerScore = "player_score";
    static readonly DiceGrid = "dice_grid";
    static readonly CharacterId = "character_id"
  };
}