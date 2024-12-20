import { supabase } from "../App";

export async function createRoom(): Promise<number> {
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
    return data?.[0]?.id || 0;
  } catch (err) {
    console.error("Unexpected error:", err);
    throw err;
  }
}