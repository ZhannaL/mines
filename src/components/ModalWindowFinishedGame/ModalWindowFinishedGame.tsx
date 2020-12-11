import React, { useState } from 'react';
import classnames from 'classnames';
import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from '@material-ui/core';
import { useGameInfo } from 'src/Provider/GameContext';
import { useGameTime } from 'src/Provider/TimeContext';
import { updateUserNameInArr, getTop10, isYourResultInTop10 } from './helpers';
import style from './ModalWindow.module.css';
import { getTimeString } from '../MinesInfo/MinesInfo';

type Props = Readonly<{
  isOpen: boolean;
  onClose: (isOpen: boolean) => unknown;
}>;

export const ModalWindowFinishedGame = ({
  isOpen,
  onClose,
}: Props): JSX.Element => {
  const [gameTime] = useGameTime();
  const [gameState] = useGameInfo();
  const { width, height, mines: minesPercent } = gameState;

  const userName = localStorage.getItem(`userName`);
  const currentUserName = userName || 'User';

  const [inputUserName, setInputUserName] = useState(currentUserName);

  const leaderboard = localStorage.getItem(
    `w:${width},h:${height},m:${minesPercent}`
  );
  const currLeaderboard: Array<{
    time: number;
    user: string;
  }> = leaderboard ? JSON.parse(leaderboard) : [];

  currLeaderboard.push({ time: gameTime, user: 'Your Result' });

  const currentLeaderboard = getTop10(currLeaderboard);

  return (
    <Dialog open={isOpen} fullWidth maxWidth="xs">
      <DialogTitle className={style.title}>Congratulation!</DialogTitle>
      <DialogContent dividers className={style.content}>
        {isYourResultInTop10(currentLeaderboard) ? (
          <TextField
            className={style.inputUserName}
            label="Name"
            type="search"
            onChange={(event) => setInputUserName(event?.target.value)}
            value={inputUserName}
          />
        ) : (
          <Typography variant="caption">You are out of Top 10</Typography>
        )}
      </DialogContent>

      <DialogContent dividers>
        {currentLeaderboard.map((el, ind) => (
          <div
            key={el.time}
            className={classnames(
              style.lineResult,
              el.user === 'Your Result' ? style.yourResult : ''
            )}
          >
            <div className={style.id}>{ind + 1}.</div>
            <div className={style.time}>{getTimeString(el.time)}</div>
            <div className={style.user}>{el.user}</div>
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            onClose(false);
            localStorage.setItem('userName', inputUserName);
            localStorage.setItem(
              `w:${width},h:${height},m:${minesPercent}`,
              JSON.stringify(
                updateUserNameInArr(getTop10(currLeaderboard), inputUserName)
              )
            );
          }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
