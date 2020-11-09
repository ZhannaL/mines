import React from 'react';
import classnames from 'classnames';
import {
  Button,
  Paper,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import style from './gameField.module.css';

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
  const fieldsElements = new Array(width * height).fill('');
  const mines = Math.ceil(((width * height) / 100) * minesPercent);

  const classes = useStyles();

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
        <Button
          variant="contained"
          color="default"
          className={style.fieldElement}
        >
          {element}
        </Button>
      ))}
    </Paper>
  );
};
