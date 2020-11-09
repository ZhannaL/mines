import React, { useState } from 'react';
import { Link } from 'gatsby';
import { Button, Typography } from '@material-ui/core';
import { useGameInfo } from 'src/Provider/GameContext';
import { InputNumber } from '../InputNumber';
import style from './customParams.module.css';

export const CustomParams = (): JSX.Element => {
  const params = localStorage.getItem('params');
  const defaultParams = params
    ? JSON.parse(params)
    : { width: 33, height: 44, mines: 160 };

  const [, setGameState] = useGameInfo();
  const [width, setWidth] = useState(defaultParams.width);
  const [height, setHeight] = useState(defaultParams.height);
  const [mines, setMines] = useState(defaultParams.mines);
  return (
    <div className={style.customPage}>
      <div className={style.customParams}>
        <div>
          <Typography> Width </Typography>
          <InputNumber
            onChange={(value) => setWidth(value)}
            defaultValue={width}
          />
        </div>
        <div>
          <Typography> Height </Typography>
          <InputNumber
            onChange={(value) => setHeight(value)}
            defaultValue={height}
          />
        </div>
        <div>
          <Typography> Mines </Typography>
          <InputNumber
            onChange={(value) => setMines(value)}
            defaultValue={mines}
          />
        </div>
      </div>
      <div className={style.customBtns}>
        <Link to="/game/" className={style.customPageLink}>
          <Button
            variant="contained"
            color="primary"
            className={style.customPageBtn}
            onClick={() => {
              setGameState({
                width,
                height,
                mines,
              });
              localStorage.setItem(
                'params',
                JSON.stringify({ width, height, mines })
              );
            }}
          >
            Play Game
          </Button>
        </Link>
        <Link to="/" className={style.customPageLink}>
          <Button
            variant="outlined"
            color="default"
            className={style.customPageBtn}
          >
            Cancel
          </Button>
        </Link>
      </div>
    </div>
  );
};
