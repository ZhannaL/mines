import React, { useState, useEffect, useMemo } from 'react';
import { useGameInfo } from 'src/Provider/GameContext';
import FlagIcon from '@material-ui/icons/Flag';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import style from './minesInfo.module.css';
import { GameStatus } from '../ButtonElementField/ButtonElementField';

type Props = Readonly<{
  gameStatus: GameStatus;
}>;

export const MinesInfo = ({ gameStatus }: Props): JSX.Element => {
  const [gameState] = useGameInfo();
  const { width, height, mines: minesPercent } = gameState;
  const mines = Math.ceil(((width * height) / 100) * minesPercent);

  const [time, setTime] = useState(0);
  console.log(gameStatus);
  useEffect(() => {
    if (gameStatus === 'started') {
      const timer = setTimeout(() => {
        setTime(time + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    return () => {};
  }, [gameStatus, time]);

  const getTimeString = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.abs(seconds - min * 60);

    return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
  };

  const secToTimeString = useMemo(() => getTimeString(time), [time]);

  return (
    <div className={style.minesInfo}>
      <div>
        <FlagIcon fontSize="large" />
        <div>0/{mines}</div>
      </div>
      <div>
        <AccessTimeIcon fontSize="large" />
        <div>{secToTimeString}</div>
      </div>
    </div>
  );
};
