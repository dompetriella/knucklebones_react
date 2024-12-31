import { supabase } from "../App";
import { characterDataList } from "../global/characterData";
import { DatabaseTableNames } from "../global/databaseNames";
import { MultiplayerRoom } from "../models/MultiplayerRoom";
import { Player } from "../models/Player";
import {
  convertDiceArrayToNumberArray,
  convertNumberArrayToDiceArray,
} from "./utility";

export function convertDatabasePlayerToPlayer(databasePlayer: any): Player {
  const character =
    characterDataList[
      databasePlayer[DatabaseTableNames.KnucklebonesPlayers.CharacterId]
    ];

  return new Player({
    id: databasePlayer[DatabaseTableNames.KnucklebonesPlayers.PlayerId],
    playerName: character.characterName,
    score: databasePlayer[DatabaseTableNames.KnucklebonesPlayers.PlayerScore],
    diceGrid: convertNumberArrayToDiceArray(
      databasePlayer[DatabaseTableNames.KnucklebonesPlayers.DiceGrid]
    ),
    character: character,
    isActivePlayer: databasePlayer[DatabaseTableNames.KnucklebonesPlayers.IsActivePlayer]
  });
}

export async function createRoom(): Promise<MultiplayerRoom | null> {
  try {
    const roomCode: string = crypto.randomUUID().substring(0, 4);
    const { data, error } = await supabase
      .from(DatabaseTableNames.KnucklebonesRooms.TableName)
      .insert([{ room_code: roomCode.toUpperCase(), created_at: new Date() }])
      .select();

    if (error) {
      console.error("Error inserting data:", error.message);
      throw new Error(error.message);
    }

    console.log("Inserted data:", data);
    if (data === null) {
      return data;
    }

    const returnedData = data[0];

    return new MultiplayerRoom({
      id: returnedData[DatabaseTableNames.KnucklebonesRooms.Id],
      roomCode: returnedData[DatabaseTableNames.KnucklebonesRooms.RoomCode],
      createdAt: returnedData[DatabaseTableNames.KnucklebonesRooms.CreatedAt],
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    throw err;
  }
}

export async function addPlayerToGame(
  roomId: number,
  player: Player
): Promise<Player | null> {
  const diceDataToNumberArray: (number | null)[][] =
    convertDiceArrayToNumberArray(player.diceGrid);

  console.log(roomId);
  console.log(player);

  try {
    const { data, error } = await supabase
      .from(DatabaseTableNames.KnucklebonesPlayers.TableName)
      .insert([
        {
          created_at: new Date(),
          room_id: roomId,
          player_id: player.id,
          player_score: player.score,
          dice_grid: diceDataToNumberArray,
          character_id: player.character?.index ?? 0,
        },
      ])
      .select();

    if (error) {
      console.error("Error inserting data:", error.message);
      throw new Error(error.message);
    }

    console.log("Inserted data:", data);
    if (data === null) {
      return data;
    }

    const returnedData = data[0];

    console.log("Returned data");
    console.log(returnedData);

    return convertDatabasePlayerToPlayer(returnedData);
  } catch (err) {
    console.error("Unexpected error:", err);
    throw err;
  }
}

export async function connectPlayerToRoom(
  roomCode: string
): Promise<MultiplayerRoom | null> {
  try {
    const { data, error } = await supabase
      .from(DatabaseTableNames.KnucklebonesRooms.TableName)
      .select("*")
      .eq(DatabaseTableNames.KnucklebonesRooms.RoomCode, roomCode);

    if (error) {
      console.error(
        `Error finding room with room code ${roomCode} - Error: `,
        error.message
      );
      throw new Error(error.message);
    }

    if (data === null) {
      console.log("Data found was null, so bailing");
      return data;
    }

    console.log(`Connected successfully: RoomId ${data[0].id}`, data);

    const returnedData = data[0];

    return new MultiplayerRoom({
      id: returnedData[DatabaseTableNames.KnucklebonesRooms.Id],
      roomCode: returnedData[DatabaseTableNames.KnucklebonesRooms.RoomCode],
      createdAt: returnedData[DatabaseTableNames.KnucklebonesRooms.CreatedAt],
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    throw err;
  }
}

export async function getPlayerUpdateFromDatabase(
  player: Player
): Promise<Player | null> {
  try {
    const { data, error } = await supabase
      .from(DatabaseTableNames.KnucklebonesPlayers.TableName)
      .select("*")
      .eq(DatabaseTableNames.KnucklebonesPlayers.PlayerId, player.id);

    if (error) {
      console.error(
        `Error finding player with playerId ${player.id} - Error: `,
        error.message
      );
      throw new Error(error.message);
    }

    if (data === null) {
      console.log("Player found was null, so bailing");
      return data;
    }

    console.log(`Successfully found player: Player: ${data[0]}`);

    const returnedData = data[0];
    return convertDatabasePlayerToPlayer(returnedData);
  } catch (err) {
    console.error("Unexpected error:", err);
    throw err;
  }
}

export async function findOtherPlayerInRoom(
  roomId: number
): Promise<Player | null> {
  try {
    const { data, error } = await supabase
      .from(DatabaseTableNames.KnucklebonesPlayers.TableName)
      .select("*")
      .eq(DatabaseTableNames.KnucklebonesPlayers.RoomId, roomId);

    if (error) {
      console.error(
        `Error finding player in room with ID ${roomId} - Error: `,
        error.message
      );
      throw new Error(error.message);
    }

    if (data === null) {
      console.log("Player found was null, so bailing");
      return data;
    }

    console.log(`Successfully found player: Player: ${data[0]}`);

    const returnedData = data[0];
    return convertDatabasePlayerToPlayer(returnedData);
  } catch (err) {
    console.error("Unexpected error:", err);
    throw err;
  }
}
