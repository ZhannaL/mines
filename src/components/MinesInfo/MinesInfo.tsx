import React from 'react';
import { useGameInfo } from 'src/Provider/GameContext';
import FlagIcon from '@material-ui/icons/Flag';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import style from './minesInfo.module.css';

// type Props = Readonly<{}>;

export const MinesInfo = (): JSX.Element => {
  const [gameState] = useGameInfo();
  const { width, height, mines: minesPercent } = gameState;
  const mines = Math.ceil(((width * height) / 100) * minesPercent);

  return (
    <div className={style.minesInfo}>
      <div>
        <FlagIcon fontSize="large" />
        <div>0/{mines}</div>
      </div>
      <div>
        <AccessTimeIcon fontSize="large" />
        <div>00:00</div>
      </div>
    </div>
  );
};
