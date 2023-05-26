import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Answers {
  username: string;
  question_id: number;
  option_id: number;
  seconds: Generated<number>;
}

export interface Control {
  id: number;
  start: Timestamp | null;
  end: Timestamp | null;
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

export interface Users {
  id: Generated<number>;
  username: string;
  email: string;
  sub: string;
}

export interface Database {
  answers: Answers;
  control: Control;
  options: Options;
  questions: Questions;
  users: Users;
}
