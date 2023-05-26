import { GameStatus } from "./types";
import { db } from "../../lib/db/db";
import { sql } from "kysely";

export async function checkGameStatus(username: string): Promise<GameStatus> {
  const controls = await db
    .selectFrom("control as c")
    .select([
      sql<string>`to_char(c.start, 'YYYY-MM-DD"T"HH24:MI:SS"Z"')`.as('start'),
      sql<string>`to_char(c.end, 'YYYY-MM-DD"T"HH24:MI:SS"Z"')`.as('end'),
      (db
        .selectFrom("answers")
        .select(sql<number>`count(*)`.as('answered'))
        .where('username', '=', username)
        .as('answered_questions')),
      (db
        .selectFrom("questions")
        .select(sql<number>`count(*)`.as('questions'))
        .as('total_questions'))
    ])
    .executeTakeFirst()

  if (controls == null || controls.start == null || controls.end == null) throw { message: "Game is not configured yet" }

  return {
    game_start: controls.start,
    game_end: controls.end,
    remaining_questions: controls.total_questions - controls.answered_questions
  };
}