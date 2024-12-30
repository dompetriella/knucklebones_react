import { supabase } from "../App";
import { characterDataList } from "../global/characterData";
import { DatabaseTableNames } from "../global/databaseNames";
import { MultiplayerRoom } from "../models/MultiplayerRoom";
import { Player } from "../models/Player";
import {
  convertDiceArrayToNumberArray,
  convertNumberArrayToDiceArray,
} from "./utility";

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

    return new Player({
      id: returnedData[DatabaseTableNames.KnucklebonesPlayers.PlayerId],
      playerName: "test",
      score: returnedData[DatabaseTableNames.KnucklebonesPlayers.PlayerScore],
      diceGrid: convertNumberArrayToDiceArray(
        returnedData[DatabaseTableNames.KnucklebonesPlayers.DiceGrid]
      ),
      character:
        characterDataList[
          returnedData[DatabaseTableNames.KnucklebonesPlayers.CharacterId]
        ],
    });
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
