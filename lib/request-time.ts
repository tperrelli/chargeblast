import { connection } from "next/server";

export async function getRequestTimestamp(): Promise<number> {
  await connection();
  return Date.now();
}
