export interface Question {
  question: string;
  options: string[];
  answer: string;
}

export interface Player {
  id: number;
  name: string;
  position: number;
  color: string;
}

export interface GameState {
  gameStarted: boolean;
  players: Player[];
  currentPlayer: number;
  questions: Question[];
  currentQuestion: Question | null;
  diceValue: number | null;
  winner: Player | null;
  answerResult: 'correct' | 'incorrect' | null;
}

export const BOARD_SIZE = 50;
export const BONUS_SQUARES = [8, 17, 33, 42];
export const TRAP_SQUARES = [13, 20, 37, 47];