import { Question, Questions, Option, FullOption } from "./types";
import { db } from "../../lib/db/db";
import { sql } from "kysely";
import { checkGameStatus } from "../control";

// This parsing is necessary because each answer comes as a string 
// from kysely-data-api (JSONB is not properly parsed)
function parseAnswers(answers: string): Option[] {
  const result = (JSON.parse(answers) as Array<FullOption>)
  return result.map(a => {
    const { is_right: foo, question_id: bar, ...answer } = a // Removing 'is_right' from the result
    return answer
  });
}

type GetQuestionsQueryResult = {
  text: string;
  options: string; // This should return as `FullOption[]` type
  id: number;
}[]

function parseQuestions(questions: GetQuestionsQueryResult): Question[] {
  return questions.map(q => ({
    ...q,
    options: parseAnswers(q.options as string)
  }))
}

export async function getQuestions(username: string): Promise<Questions> {
  const game_status = await checkGameStatus(username);

  const questions: GetQuestionsQueryResult = await db
    .selectFrom("questions as q")
    .select([
      "q.id",
      "q.text",
      sql<string>`json_agg(o.*)`.as("options")
    ])
    .leftJoin("options as o", "q.id", "o.question_id")
    .groupBy("q.id")
    .execute()

  return {
    amount: questions.length,
    questions: parseQuestions(questions),
    game_status
  }
}