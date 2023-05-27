import { Options } from "../../lib/db/types"
import { GameStatus } from "../control"

export type Option = {
  id: number,
  text: string,
}

export type FullOption = Options

export type Question = {
  id: number,
  text: string,
  options: Option[]
}

export type Questions = {
  amount: number,
  questions: Question[],
  game_status: GameStatus
}