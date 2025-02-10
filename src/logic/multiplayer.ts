import { supabase } from "../App";
import { characterDataList } from "../global/characterData";
import { DatabaseTableNames } from "../global/databaseNames";
import { emptyDiceArray } from "../global/utility";
import { DiceData } from "../models/DiceData";
import { MultiplayerRoom } from "../models/MultiplayerRoom";
import { Player } from "../models/Player";
import {
  convertDiceArrayToJsonArray,
  convertJsonArrayToDiceArray,
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
    diceGrid: convertJsonArrayToDiceArray(
      databasePlayer[DatabaseTableNames.KnucklebonesPlayers.DiceGrid]
    ),
    character: character,
    isActivePlayer:
      databasePlayer[DatabaseTableNames.KnucklebonesPlayers.IsActivePlayer],
  });
}

export async function rollMultiplayerDice({
  die,
  roomId,
}: {
  die: DiceData | null;
  roomId: number;
}): Promise<DiceData | null> {
  try {
    const { data, error } = await supabase
      .from(DatabaseTableNames.KnucklebonesRooms.TableName)
      .update({
        usable_dice:
          die === null ? null : { id: die!.id, numberValue: die!.numberValue },
      })
      .eq(DatabaseTableNames.KnucklebonesRooms.Id, roomId)
      .select();

    if (error) {
      console.error("Error rolling new die to network:", error.message);
      throw new Error(error.message);
    }

    if (data === null) {
      return data;
    }

    const returnedData = data[0];

    if (returnedData === null || returnedData === undefined) {
      return null;
    }

    return new DiceData({
      id: returnedData[DatabaseTableNames.KnucklebonesRooms.UsableDice]?.id,
      numberValue:
        returnedData[DatabaseTableNames.KnucklebonesRooms.UsableDice]
          ?.numberValue,
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
      return data;
    }

    const returnedData = data[0];

    if (
      returnedData.usable_dice === null ||
      returnedData.usable_dice === undefined
    ) {
      return null;
    }

    return new DiceData({
      id: returnedData.usable_dice.id,
      numberValue: returnedData.usable_dice.numberValue,
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
  const diceDataToJsonArray = convertDiceArrayToJsonArray(player.diceGrid);

  try {
    const { data, error } = await supabase
      .from(DatabaseTableNames.KnucklebonesPlayers.TableName)
      .insert([
        {
          created_at: new Date(),
          room_id: roomId,
          player_id: player.id,
          player_score: player.score,
          dice_grid: diceDataToJsonArray,
          character_id: player.character?.index ?? 0,
        },
      ])
      .select();

    if (error) {
      console.error("Error inserting data:", error.message);
      throw new Error(error.message);
    }

    if (data === null) {
      return data;
    }

    const returnedData = data[0];

    return convertDatabasePlayerToPlayer(returnedData);
  } catch (err) {
    console.error("Unexpected error:", err);
    throw err;
  }
}

export async function updatePlayerFromState(
  player: Player
): Promise<Player | null> {
  const diceDataToJsonArray = convertDiceArrayToJsonArray(player.diceGrid);

  try {
    const { data, error } = await supabase
      .from(DatabaseTableNames.KnucklebonesPlayers.TableName)
      .update({
        player_id: player.id,
        created_at: new Date(),
        player_score: player.score,
        dice_grid: diceDataToJsonArray,
        character_id: player.character?.index,
        is_active_player: player.isActivePlayer,
      })
      .eq(DatabaseTableNames.KnucklebonesPlayers.PlayerId, player.id)
      .select();

    if (error) {
      console.error("Error updating data:", error.message);
      throw new Error(error.message);
    }

    if (data === null) {
      return data;
    }

    const returnedData = data[0];

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
      return data;
    }

    if (data.length == 0) {
      return null;
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
      return data;
    }

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
      return data;
    }

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
      return data;
    }

    const returnedData = data[0];

    return convertDatabasePlayerToPlayer(returnedData);
  } catch (err) {
    console.error("Unexpected error:", err);
    throw err;
  }
}

export async function swapNetworkPlayers(
  playerIdToActivate: string,
  playerIdToDeactivate: string
): Promise<Player | null> {
  try {
    // Prepare the data for upsert
    const updates = [
      {
        player_id: playerIdToActivate,
        is_active_player: true,
      },
      {
        player_id: playerIdToDeactivate,
        is_active_player: false,
      },
    ];

    // Perform the upsert
    const { data, error } = await supabase
      .from(DatabaseTableNames.KnucklebonesPlayers.TableName)
      .upsert(updates, { onConflict: "player_id" }) // Use player_id as the unique key
      .select();

    if (error) {
      console.error(
        `Error swapping active players: ${playerIdToActivate} and ${playerIdToDeactivate} - Error: `,
        error.message
      );
      throw new Error(error.message);
    }

    if (!data || data.length === 0) {
      return null;
    }

    // Find the player that was activated
    const activatedPlayer = data.find(
      (player) => player.player_id === playerIdToActivate
    );

    return activatedPlayer
      ? convertDatabasePlayerToPlayer(activatedPlayer)
      : null;
  } catch (err) {
    console.error("Unexpected error:", err);
    throw err;
  }
}

export async function deleteHourOldRooms() {
  const hourOld = new Date(Date.now() - 3600 * 1000);

  try {
    const {  error } = await supabase
      .from(DatabaseTableNames.KnucklebonesPlayers.TableName)
      .delete()
      .lt(
        DatabaseTableNames.KnucklebonesPlayers.CreatedAt,
        hourOld.toISOString()
      )
      .select();

    if (error) {
      console.error("Error deleting rows:", error);
    } 
    
  } catch (e) {
    console.log("An error occurred:", e);
  }

  try {
    const { error } = await supabase
      .from(DatabaseTableNames.KnucklebonesRooms.TableName)
      .delete()
      .lt(
        DatabaseTableNames.KnucklebonesPlayers.CreatedAt,
        hourOld.toISOString()
      )
      .select();

    if (error) {
      console.error("Error deleting rows:", error);
    } 
  } catch (e) {
    console.log("An error occurred:", e);
  }
}

export async function deleteGameByRoomId(roomId: number) {
  const hourOld = new Date(Date.now() - 3600 * 1000);

  try {
    const {  error } = await supabase
      .from(DatabaseTableNames.KnucklebonesPlayers.TableName)
      .delete()
      .eq(DatabaseTableNames.KnucklebonesPlayers.RoomId, roomId)
      .select();

    if (error) {
      console.error("Error deleting rows:", error);
    }
  } catch (e) {
    console.log("An error occurred:", e);
  }

  try {
    const { error } = await supabase
      .from(DatabaseTableNames.KnucklebonesRooms.TableName)
      .delete()
      .lt(DatabaseTableNames.KnucklebonesPlayers.CreatedAt, hourOld);

    if (error) {
      console.error("Error deleting rows:", error);
    }
  } catch (e) {
    console.log("An error occurred:", e);
  }
}

export async function restartMultiplayerGame({
  homePlayerState,
  awayPlayerState,
  roomId,
}: {
  homePlayerState: Player;
  awayPlayerState: Player;
  roomId: number;
}) {
  const updatedHomePlayer = homePlayerState.copyWith({
    score: 0,
    diceGrid: emptyDiceArray,
    isActivePlayer: false,
  });
  const updatedAwayPlayer = awayPlayerState.copyWith({
    score: 0,
    diceGrid: emptyDiceArray,
    isActivePlayer: false,
  });

  await updatePlayerFromState(updatedHomePlayer);
  await updatePlayerFromState(updatedAwayPlayer);
  await rollMultiplayerDice({ die: null, roomId: roomId });
}
