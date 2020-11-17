import React, { useState, useEffect, useMemo } from 'react';
import { useGameInfo } from 'src/Provider/GameContext';
import FlagIcon from '@material-ui/icons/Flag';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { GameStatus } from 'src/hooks/types';
import style from './minesInfo.module.css';

const getTimeString = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = Math.abs(seconds - min * 60);
  return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
};

type Props = Readonly<{
  gameStatus: GameStatus;
  flagsOnField: number;
}>;

export const MinesInfo = ({ gameStatus, flagsOnField }: Props): JSX.Element => {
  const [gameState] = useGameInfo();
  const { width, height, mines: minesPercent } = gameState;
  const mines = Math.ceil(((width * height) / 100) * minesPercent);

  const [time, setTime] = useState(0);
  useEffect(() => {
    if (gameStatus === 'started') {
      const timer = setTimeout(() => {
        setTime(time + 1);
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
    if (gameStatus === 'none') {
      setTime(0);
    }
    return () => setTime(0);
  }, [gameStatus, time]);
  const secToTimeString = useMemo(() => getTimeString(time), [time]);

  return (
    <div className={style.minesInfo}>
      <div>
        <FlagIcon fontSize="large" />
        <div>
          {flagsOnField}/{mines}
        </div>
      </div>
      <div>
        <AccessTimeIcon fontSize="large" />
        <div>{secToTimeString}</div>
      </div>
    </div>
  );
};
