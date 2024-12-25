import { supabase } from "../App";
import { MultiplayerRoom } from "../models/MultiplayerRoom";

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