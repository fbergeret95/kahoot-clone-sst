import { User } from "./types";
import { db } from "../../lib/db/db";

export async function createUser(user: User): Promise<void> {
  await db
    .insertInto("users")
    .values({
      ...user
    })
    .executeTakeFirst()
  return;
}