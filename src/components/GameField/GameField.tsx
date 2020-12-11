/* eslint-disable no-plusplus */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import classnames from 'classnames';
import { Paper, makeStyles, createStyles, Theme } from '@material-ui/core';
import { GameFieldElement, GameFieldStatus, GameStatus } from 'src/hooks/types';
import style from './gameField.module.css';
import { ButtonElementField } from '../ButtonElementField';
import {
  findEmptySlotIndex,
  getNumbersToField,
  getIndexesAdjustment,
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

  const fieldsElements = (indexToSkip: number) => {
    const fieldsElementsMines = new Array(width * height).fill('');
    const arrayOfIndexes = fieldsElementsMines.map((el, ind) => ind);
    arrayOfIndexes.splice(indexToSkip, 1);
    for (let i = 0; i < mines; i++) {
      fieldsElementsMines[findEmptySlotIndex(arrayOfIndexes)] = 'm';
    }
    getNumbersToField(fieldsElementsMines, width, height);
    return fieldsElementsMines.map((el) => ({ content: el, status: 'close' }));
  };

  const generateEmptyField = useCallback(() => {
    const fieldsElementsMines = new Array(width * height).fill('');
    const firstField = fieldsElementsMines.map(
      () =>
        ({
          content: 0,
          status: 'close',
        } as const)
    );
    return firstField;
  }, [height, width]);

  const [field, setField] = useState<
    Array<{
      content: GameFieldElement;
      status: GameFieldStatus;
    }>
  >(generateEmptyField);
  const [gameStatus, setGameStatus] = useState<GameStatus>('none');
  const [flagsOnField, setFlagsOnField] = useState(0);
  const [isGameFieldGenerated, setIsGameFieldGenerated] = useState(false);

  const setStatusToOpen = (
    array: Array<{
      content: GameFieldElement;
      status: GameFieldStatus;
    }>,
    indexToSet: number
  ) => {
    const copied = [...array];
    const innerFn = (
      copiedArr: Array<{
        content: GameFieldElement;
        status: GameFieldStatus;
      }>,
      indexToOpen: number
    ) => {
      if (copiedArr[indexToOpen].content !== 'm') {
        copiedArr[indexToOpen].status = 'open';
      }
      if (copiedArr[indexToOpen].content === 0) {
        const indexes = getIndexesAdjustment(indexToOpen, width, height);
        indexes.forEach((index) => {
          if (copiedArr[index].status !== 'open') {
            innerFn(copiedArr, index);
          }
        });
      }
      return copiedArr;
    };
    setField(innerFn(copied, indexToSet));
  };

  const finishingGameByFault = (
    array: Array<{
      content: GameFieldElement;
      status: GameFieldStatus;
    }>,
    indexFault: number
  ) => {
    array.map((el, index) => {
      if (el.content === 'm') {
        el.status = 'flag';
      }
      if (indexFault === index) {
        el.status = 'fault';
      }
      return el;
    });
    setGameStatus('lost');
    onChangeGameStatus('lost');
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
    const closed = field.filter((el) => el.status === 'close');
    const setsMines = field.filter(
      (el) => el.status === 'flag' && el.content === 'm'
    );
    if (closed.length === 0 && setsMines.length === mines) {
      setGameStatus('finished');
      onChangeGameStatus('finished');
      setIsModalOpen(true);
    }
  }, [field, mines, onChangeGameStatus]);

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
          key={ind}
          element={element}
          onChange={() => {
            if (!isGameFieldGenerated) {
              const generated = fieldsElements(ind);
              setStatusToOpen(generated, ind);
              setIsGameFieldGenerated(true);
              setGameStatus('started');
              onChangeGameStatus('started');
            } else {
              setStatusToOpen(field, ind);
            }
            if (element.content === 'm') {
              finishingGameByFault(field, ind);
            }
            if (element.status === 'open') {
              // console.log(ind);
            }
          }}
          gameStatus={gameStatus}
          onChangeStatusToFlag={() => {
            if (element.status !== 'flag') {
              setFlagsOnField(flagsOnField + 1);
              onChangeFlagsOnField(flagsOnField + 1);
            }
            if (element.status === 'close') {
              setField(
                field.map((el, index) => {
                  if (ind === index) {
                    return { content: el.content, status: 'flag' };
                  }
                  return el;
                })
              );
            }
            if (element.status === 'flag') {
              setField(
                field.map((el, index) => {
                  if (ind === index) {
                    return { content: el.content, status: 'close' };
                  }
                  return el;
                })
              );
            }
          }}
        />
      ))}
    </Paper>
  );
};
