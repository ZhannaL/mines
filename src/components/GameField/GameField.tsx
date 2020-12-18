/* eslint-disable no-plusplus */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import classnames from 'classnames';
import { Paper, makeStyles, createStyles, Theme } from '@material-ui/core';
import { GameStatus, GameFieldData } from 'src/hooks/types';
import style from './gameField.module.css';
import { ButtonElementField } from '../ButtonElementField';
import {
  getFieldWithOpenedSlot,
  getFieldFinishingGameByFault,
  getFieldWithNewStatus,
  generatedFieldsElements,
  genaratedEmptyField,
  isMinesPlaced,
  getNewFieldAfterOpenedSlot,
} from './helpers';
import { ModalWindowFinishedGame } from '../ModalWindowFinishedGame';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    thumb: {
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  })
);

type Props = Readonly<{
  width?: number;
  height?: number;
  minesPercent?: number;
  parentWidth?: number;
  parentHeight?: number;
  onChangeGameStatus: (status: GameStatus) => unknown;
  onChangeFlagsOnField: (flags: number) => unknown;
  gameID: number;
}>;

export const GameField = ({
  width = 10,
  height = 16,
  minesPercent = 2,
  parentWidth,
  parentHeight,
  onChangeGameStatus,
  onChangeFlagsOnField,
  gameID,
}: Props): JSX.Element => {
  const classes = useStyles();

  const mines = useMemo(
    () => Math.ceil(((width * height) / 100) * minesPercent),
    [height, minesPercent, width]
  );

  const generateEmptyField = useCallback(() => {
    return genaratedEmptyField(height, width);
  }, [height, width]);

  const [field, setField] = useState<Array<GameFieldData>>(generateEmptyField);
  const [gameStatus, setGameStatus] = useState<GameStatus>('none');
  const [flagsOnField, setFlagsOnField] = useState(0);
  const [isGameFieldGenerated, setIsGameFieldGenerated] = useState(false);

  const finishingGameByFault = (
    array: Array<GameFieldData>,
    indexFault: number
  ) => {
    setGameStatus('lost');
    onChangeGameStatus('lost');
    return getFieldFinishingGameByFault(array, indexFault);
  };

  useEffect(() => {
    setField(generateEmptyField);
    setIsGameFieldGenerated(false);
    setGameStatus('none');
    onChangeGameStatus('none');
    setFlagsOnField(0);
    onChangeFlagsOnField(0);
  }, [gameID, generateEmptyField, onChangeFlagsOnField, onChangeGameStatus]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isMinesPlaced(field, mines)) {
      setGameStatus('finished');
      onChangeGameStatus('finished');
      setIsModalOpen(true);
    }
  }, [field, mines, onChangeGameStatus]);

  const leftClick = (element: GameFieldData, ind: number) => {
    if (!isGameFieldGenerated) {
      const generated = generatedFieldsElements(ind, width, height, mines);
      const newField = getFieldWithOpenedSlot(generated, ind, width, height);
      setField(newField);
      setIsGameFieldGenerated(true);
      setGameStatus('started');
      onChangeGameStatus('started');
      return;
    }

    const newField = getNewFieldAfterOpenedSlot(
      field,
      ind,
      width,
      height,
      element,
      finishingGameByFault
    );
    setField(newField);
  };

  const rightClick = (element: GameFieldData, ind: number) => {
    if (element.status !== 'flag') {
      setFlagsOnField(flagsOnField + 1);
      onChangeFlagsOnField(flagsOnField + 1);
    }
    if (element.status === 'close') {
      setField(getFieldWithNewStatus(field, ind, 'flag'));
    }
    if (element.status === 'flag') {
      setFlagsOnField(flagsOnField - 1);
      onChangeFlagsOnField(flagsOnField - 1);
      setField(getFieldWithNewStatus(field, ind, 'close'));
    }
  };

  return (
    <Paper
      className={classnames(style.field, classes.thumb)}
      style={{
        gridTemplateColumns: `repeat(${width}, 1fr)`,
        minWidth: `${parentWidth}px`,
        height: `${parentHeight}px`,
      }}
      onContextMenuCapture={(event) => {
        event.preventDefault();
      }}
    >
      <ModalWindowFinishedGame
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      {field.map((element, ind) => (
        <ButtonElementField
          // eslint-disable-next-line react/no-array-index-key
          key={ind}
          element={element}
          onChange={() => leftClick(element, ind)}
          gameStatus={gameStatus}
          onChangeStatusToFlag={() => rightClick(element, ind)}
        />
      ))}
    </Paper>
  );
};
