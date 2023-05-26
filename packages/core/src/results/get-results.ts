import { Results } from "./types";
import { db } from "../../lib/db/db";
import { sql } from "kysely";

export async function getResults(): Promise<Results> {
  const results = await db
    .selectFrom("answers as a")
    .select([
      "a.username",
      sql<number>`count(o.id)`.as('score'),
      (eb) => eb.selectFrom("answers as an")
        .select(sql<number> `sum(seconds)`.as('time'))
        .whereRef("an.username", "=", "a.username")
        .as("time")
    ])
    .innerJoin("options as o", "a.option_id", "o.id")
    .where("o.is_right", "=", true)
    .groupBy("a.username")
    .orderBy("score", "desc")
    .orderBy("time", "asc")
    .execute()

  return results;
}