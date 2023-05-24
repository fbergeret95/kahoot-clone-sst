import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Answers {
  user_alias: string;
  question_id: number;
  option_id: number;
  added_seconds: Generated<number>;
}

export interface Options {
  id: number;
  question_id: number;
  text: string;
  is_right: boolean;
}

export interface Questions {
  id: number;
  text: string;
}

export interface Database {
  answers: Answers;
  options: Options;
  questions: Questions;
}
