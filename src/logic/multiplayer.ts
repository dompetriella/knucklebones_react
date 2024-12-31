import { supabase } from "../App";
import { characterDataList } from "../global/characterData";
import { DatabaseTableNames } from "../global/databaseNames";
import { DiceData } from "../models/DiceData";
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
    isActivePlayer:
      databasePlayer[DatabaseTableNames.KnucklebonesPlayers.IsActivePlayer],
  });
}

export async function rollMultiplayerDice({
  dieNumber,
  roomId,
}: {
  dieNumber: number | null;
  roomId: number;
}): Promise<DiceData | null> {
  try {
    console.log(`Sending die number: ${dieNumber} to room`);
    const { data, error } = await supabase
      .from(DatabaseTableNames.KnucklebonesRooms.TableName)
      .update({ usable_dice: dieNumber })
      .eq(DatabaseTableNames.KnucklebonesRooms.Id, roomId)
      .select();

    if (error) {
      console.error("Error rolling new die to network:", error.message);
      throw new Error(error.message);
    }

    console.log("Rolled network die:", data);
    if (data === null) {
      console.log("Die is null, this is alright if purposeful");
      return data;
    }

    const returnedData = data[0];

    return new DiceData({
      id: crypto.randomUUID(),
      numberValue:
        returnedData[DatabaseTableNames.KnucklebonesRooms.UsableDice],
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    throw err;
  }
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
      usableDice: returnedData[DatabaseTableNames.KnucklebonesRooms.UsableDice],
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    throw err;
  }
}

export async function getDiceDataForState(
  roomId: number
): Promise<DiceData | null> {
  try {
    const { data, error } = await supabase
      .from(DatabaseTableNames.KnucklebonesRooms.TableName)
      .select(DatabaseTableNames.KnucklebonesRooms.UsableDice)
      .eq(DatabaseTableNames.KnucklebonesRooms.Id, roomId);

    if (error) {
      console.error(
        `Error finding dice data for room ${roomId} - Error: `,
        error.message
      );
      throw new Error(error.message);
    }

    if (data === null) {
      console.log("Data found was null");
      return data;
    }

    const returnedData = data[0];
    console.log(`Die value returned: ${returnedData.usable_dice}`);

    if (returnedData.usable_dice === null) {
      return null;
    }

    return new DiceData({
      id: crypto.randomUUID(),
      numberValue: returnedData.usable_dice,
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

export async function updatePlayerFromState(
  player: Player
): Promise<Player | null> {
  const diceDataToNumberArray: (number | null)[][] =
    convertDiceArrayToNumberArray(player.diceGrid);

  console.log(player);

  try {
    const { data, error } = await supabase
      .from(DatabaseTableNames.KnucklebonesPlayers.TableName)
      .update({
        player_id: player.id,
        created_at: new Date(),
        player_score: player.score,
        dice_grid: diceDataToNumberArray,
        character_id: player.character?.index,
        is_active_player: player.isActivePlayer,
      })
      .eq(DatabaseTableNames.KnucklebonesPlayers.PlayerId, player.id)
      .select();

    if (error) {
      console.error("Error updating data:", error.message);
      throw new Error(error.message);
    }

    console.log("updated player data:", data);
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
      usableDice: returnedData[DatabaseTableNames.KnucklebonesRooms.UsableDice],
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

    console.log(
      `Successfully found player for local update: Player: ${data[0]}`
    );

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

    console.log(`Successfully found player in room: Player: ${data[0]}`);

    const returnedData = data[0];
    return convertDatabasePlayerToPlayer(returnedData);
  } catch (err) {
    console.error("Unexpected error:", err);
    throw err;
  }
}

export async function setPlayerActivity(
  isActive: boolean,
  playerIdToActivate: string
): Promise<Player | null> {
  try {
    const { data, error } = await supabase
      .from(DatabaseTableNames.KnucklebonesPlayers.TableName)
      .update({ is_active_player: isActive })
      .eq(DatabaseTableNames.KnucklebonesPlayers.PlayerId, playerIdToActivate)
      .select();

    if (error) {
      console.error(
        `Error finding player with ID ${playerIdToActivate} - Error: `,
        error.message
      );
      throw new Error(error.message);
    }

    if (data === null) {
      console.log("Player found was null, so bailing");
      return data;
    }

    const returnedData = data[0];
    console.log(
      `Successfully found Player: ${
        returnedData[DatabaseTableNames.KnucklebonesPlayers.PlayerId]
      }`
    );
    console.log(`${isActive ? "Activating Player" : "Deactivating Player"}`);

    return convertDatabasePlayerToPlayer(returnedData);
  } catch (err) {
    console.error("Unexpected error:", err);
    throw err;
  }
}
