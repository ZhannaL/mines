import React, {
  useState,
  ReactNode,
  createContext,
  useContext,
  useMemo,
} from 'react';

type GameState = {
  width: number;
  height: number;
  mines: number;
};

export const GameInfoContext = createContext<
  [GameState, (newState: GameState) => void]
>([
  {
    width: 0,
    height: 0,
    mines: 0,
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {},
]);

type Props = {
  children: ReactNode;
};

export const GameInfoProvider = ({ children }: Props): JSX.Element => {
  const params = localStorage.getItem('params');
  const defaultParams = params
    ? JSON.parse(params)
    : { width: 33, height: 44, mines: 16 };

  const [gameState, setGameState] = useState<GameState>({
    width: defaultParams.width,
    height: defaultParams.height,
    mines: defaultParams.mines,
  });
  const value = useMemo(() => [gameState, setGameState], [gameState]);
  return (
    <GameInfoContext.Provider value={value}>
      {children}
    </GameInfoContext.Provider>
  );
};

export const useGameInfo = () => useContext(GameInfoContext);
