import { Question, Questions } from "./types";
import { db } from "../../lib/db/db";
import { sql } from "kysely";
import { Answer, FullAnswer } from "../answers";

// This parsing is necessary because each answer comes as a string 
// from kysely-data-api (JSONB is not properly parsed)
function parseAnswers(answers: string): Answer[] {
  const result = (JSON.parse(answers) as Array<FullAnswer>)
  return result.map(a => {
    const { is_right: foo, question_id: bar, ...answer } = a // Removing 'is_right' from the result
    return answer
  });
}

type GetQuestionsQueryResult = {
  text: string;
  answers: string; // This should return as `FullAnswer[]` type
  id: number;
}[]

function parseQuestions(questions: GetQuestionsQueryResult): Question[] {
  return questions.map(q => ({
    ...q,
    answers: parseAnswers(q.answers as string)
  }))
}

export async function getQuestions(): Promise<Questions> {
  const questions: GetQuestionsQueryResult = await db
    .selectFrom("questions as q")
    .select([
      "q.id",
      "q.text",
      sql<string>`json_agg(a.*)`.as("answers")
    ])
    .leftJoin("answers as a", "q.id", "a.question_id")
    .groupBy("q.id")
    .execute()

  return {
    amount: questions.length,
    questions: parseQuestions(questions)
  }
}