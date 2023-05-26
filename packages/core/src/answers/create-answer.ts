import { db } from "../../lib/db/db";
import { GameStatus, checkGameStatus } from "../control";
import { Answer } from './types';

export async function createAnswer(answer: Answer): Promise<GameStatus> {
  const { start, end, question_id, option_id, username } = answer;
  const seconds = (new Date(end).getSeconds() - new Date(start).getSeconds())

  const game_status = await checkGameStatus(username);

  if (new Date(game_status.game_end) < new Date() || game_status.remaining_questions === 0) {
    throw { message: "Game Finished" };
  }

  await db.insertInto("answers")
    .values({
      username,
      question_id,
      option_id,
      seconds
    })
    .execute()

  game_status.remaining_questions -= 1;

  return game_status;
}
