/* eslint-disable no-plusplus */
import React, { useState } from 'react';
import classnames from 'classnames';
import { Paper, makeStyles, createStyles, Theme } from '@material-ui/core';
import style from './gameField.module.css';
import { ButtonElementField } from '../ButtonElementField';
import {
  findEmptySlotIndex,
  getNumbersToField,
  getIndexesAdjustment,
} from './helpers';
import {
  GameFieldElement,
  GameFieldStatus,
  GameStatus,
} from '../ButtonElementField/ButtonElementField';

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
}>;

export const GameField = ({
  width = 10,
  height = 16,
  minesPercent = 2,
  parentWidth,
  parentHeight,
  onChangeGameStatus,
}: Props): JSX.Element => {
  const classes = useStyles();

  const fieldsElementsMines = new Array(width * height).fill('');
  const mines = Math.ceil(((width * height) / 100) * minesPercent);
  const arrayOfIndexes = fieldsElementsMines.map((el, ind) => ind);
  const firstField = fieldsElementsMines.map(() => ({
    content: 0,
    status: 'close',
  }));
  const fieldsElements = () => {
    for (let i = 0; i < mines; i++) {
      fieldsElementsMines[findEmptySlotIndex(arrayOfIndexes)] = 'm';
    }
    getNumbersToField(fieldsElementsMines, width, height);
    return fieldsElementsMines.map((el) => ({ content: el, status: 'close' }));
  };

  const [field, setField] = useState<
    Array<{
      content: GameFieldElement;
      status: GameFieldStatus;
    }>
  >(firstField);
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
  const [gameStatus, setGameStatus] = useState<GameStatus>('none');
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
    setGameStatus('finished');
    onChangeGameStatus('finished');
  };
  return (
    <Paper
      className={classnames(style.field, classes.thumb)}
      style={{
        gridTemplateColumns: `repeat(${width}, 1fr)`,
        minWidth: `${parentWidth}px`,
        height: `${parentHeight}px`,
      }}
    >
      {field.map((element, ind) => (
        <ButtonElementField
          key={ind}
          element={element}
          onChange={() => {
            if (!isGameFieldGenerated) {
              arrayOfIndexes.splice(ind, 1);
              const generated = fieldsElements();

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
          }}
          gameStatus={gameStatus}
          onChangeStatusToFlag={() => {
            setField(
              field.map((el, index) => {
                if (ind === index) {
                  return { content: el.content, status: 'flag' };
                }
                return el;
              })
            );
          }}
        />
      ))}
    </Paper>
  );
};
