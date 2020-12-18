export type GameFieldElement = 'm' | number;
export type GameFieldStatus = 'open' | 'close' | 'flag' | 'fault' | 'mine';
export type GameStatus = 'none' | 'started' | 'finished' | 'lost';

export type GameFieldData = {
  content: GameFieldElement;
  status: GameFieldStatus;
};
