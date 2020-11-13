import React, { useMemo } from 'react';
import classnames from 'classnames';
import {
  Button,
  Paper,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import style from './gameField.module.css';
import { ButtonElementField } from '../ButtonElementField';

type GameFieldMines = '' | 'm' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

const findEmptySlotIndex = (
  // array: ReadonlyArray<GameFieldMines>,
  arrInd: Array<number>
): number => {
  // console.log(arrInd);

  const index = Math.floor(Math.random() * arrInd.length);

  const indexToReturn = arrInd[index];
  arrInd.splice(index, 1);
  // console.log(index, indexToReturn);

  return indexToReturn;
};

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
}>;

export const GameField = ({
  width = 10,
  height = 16,
  minesPercent = 2,
  parentWidth,
  parentHeight,
}: Props): JSX.Element => {
  const classes = useStyles();

  const fieldsElements = useMemo(() => {
    const fieldsElementsMines = new Array(width * height).fill('');
    const mines = Math.ceil(((width * height) / 100) * minesPercent);
    console.log(mines);
    const arrayOfIndexes = fieldsElementsMines.map((el, ind) => ind);
    console.time('qwe');
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < mines; i++) {
      fieldsElementsMines[findEmptySlotIndex(arrayOfIndexes)] = 'm';
    }
    console.timeEnd('qwe');

    return fieldsElementsMines;
  }, [width, height, minesPercent]);

  return (
    <Paper
      className={classnames(style.field, classes.thumb)}
      style={{
        gridTemplateColumns: `repeat(${width}, 1fr)`,
        minWidth: `${parentWidth}px`,
        height: `${parentHeight}px`,
      }}
    >
      {fieldsElements.map((element) => (
        <ButtonElementField element={element} />
      ))}
    </Paper>
  );
};
