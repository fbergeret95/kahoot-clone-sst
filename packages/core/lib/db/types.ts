export interface Answers {
  user_alias: string;
  question_id: number;
  option_id: number;
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
