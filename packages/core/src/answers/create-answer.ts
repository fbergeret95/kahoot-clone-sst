import { db } from "../../lib/db/db";
import { Answer } from './types';

export async function createAnswer(answer: Answer): Promise<void> {
  const { start, end, question_id, option_id, username } = answer;
  const seconds = (new Date(end).getSeconds() - new Date(start).getSeconds())

  await db.insertInto("answers")
    .values({
      username,
      question_id,
      option_id,
      seconds
    })
    .execute()
}
