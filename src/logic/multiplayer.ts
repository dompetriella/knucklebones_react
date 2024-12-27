import { supabase } from "../App";
import { characterDataList } from "../global/characterData";
import { MultiplayerRoom } from "../models/MultiplayerRoom";
import { Player } from "../models/Player";
import { convertDiceArrayToNumberArray, convertNumberArrayToDiceArray } from "./utility";

export async function createRoom(): Promise<MultiplayerRoom | null> {
  try {
    const roomCode: string = crypto.randomUUID().substring(0, 4);
    const { data, error } = await supabase
      .from('knucklebones_rooms')
      .insert([
        { room_code: roomCode.toUpperCase(), created_at: new Date() },
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

    return new MultiplayerRoom({id: returnedData['id'], roomCode: returnedData['room_code'], createdAt: returnedData['created_at']})

  } catch (err) {
    console.error("Unexpected error:", err);
    throw err;
  }
}

export async function addPlayerToGame(roomId: number, player: Player): Promise<Player | null> {
  
  const diceDataToNumberArray: (number | null)[][] = convertDiceArrayToNumberArray(player.diceGrid);
  
  try {
    const { data, error } = await supabase
      .from('knucklebones_players')
      .insert([
        { created_at: new Date(), room_id: roomId, 
          player_id: player.id, 
          player_score: player.score, dice_grid: diceDataToNumberArray, character_id: player.character?.index ?? 0 },
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

    return new Player({id: returnedData['player_id'], playerName: "test", 
      score: returnedData['player_score'], 
      diceGrid: convertNumberArrayToDiceArray(returnedData['dice_grid']), 
      character: characterDataList[returnedData['character_id']]})

  } catch (err) {
    console.error("Unexpected error:", err);
    throw err;
  }
}