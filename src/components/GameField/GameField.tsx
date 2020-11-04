import React from 'react';
import { Button, Paper } from '@material-ui/core';
import style from './gameField.module.css';

type Props = Readonly<{
  width?: number;
  height?: number;
  mines?: number;

  parentWidth?: number;
  parentHeight?: number;
}>;

export const GameField = ({
  width = 10,
  height = 16,
  mines = 20,
  parentWidth = 100,
  parentHeight = 160,
}: Props): JSX.Element => {
  const fieldsElements = new Array(width * height).fill('');
  return (
    <div
      className={style.field}
      style={{
        gridTemplateColumns: `repeat(${width}, 1fr)`,
        width: `${parentWidth}px`,
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
    </div>
  );
};
