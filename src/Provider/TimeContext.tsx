import React, { ReactNode, useState, useMemo, useContext } from 'react';

const TimeContext = React.createContext<[number, (time: number) => void]>([
  0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {},
]);

type Props = {
  children: ReactNode;
};

export const GameTimeProvider = ({ children }: Props): JSX.Element => {
  const [gameTime, setGameTime] = useState(0);
  const value = useMemo(() => [gameTime, setGameTime], [gameTime]);
  return <TimeContext.Provider value={value}>{children}</TimeContext.Provider>;
};

export const useGameTime = () => useContext(TimeContext);
