import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'gatsby';
import { Button } from '@material-ui/core';
import { getInnerWidth, getInnerHeight } from 'src/hooks/getInnerSize';
import { GameField } from '../components/GameField';
import style from './game.module.css';
import { useGameInfo } from '../Provider/GameContext';

const GamePage = (): JSX.Element => {
  const [gameState] = useGameInfo();
  const { width, height, mines } = gameState;

  const [gameFieldwrapperWidth, setGameFieldwrapperWidth] = useState(0);
  const [gameFieldwrapperHeight, setGameFieldwrapperHeight] = useState(0);

  const ref = useRef(null);
  const gameFieldwrapper = useCallback((node) => {
    ref.current = node;
    if (node !== null) {
      setGameFieldwrapperWidth(getInnerWidth(node));
      setGameFieldwrapperHeight(getInnerHeight(node));
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const node = ref.current;
      if (node !== null) {
        setGameFieldwrapperWidth(getInnerWidth(node));
        setGameFieldwrapperHeight(getInnerHeight(node));
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={style.gamePage}>
      <div
        ref={gameFieldwrapper}
        style={{ minWidth: '60vw', maxWidth: '80vw', height: '100vh' }}
        className={style.gameField}
      >
        <GameField
          width={width}
          height={height}
          minesPercent={mines}
          parentWidth={
            width <= height
              ? (gameFieldwrapperHeight * width) / height
              : gameFieldwrapperWidth
          }
          parentHeight={
            width > height
              ? (gameFieldwrapperWidth * height) / width
              : gameFieldwrapperHeight
          }
        />
      </div>
      <div className={style.gamePageSettings}>
        <Link to="/" className={style.gamePageSetting}>
          <Button
            variant="contained"
            color="primary"
            className={style.gamePageSettingBtn}
          >
            Start Over
          </Button>
        </Link>
        <Link to="/" className={style.gamePageSetting}>
          <Button
            variant="contained"
            color="primary"
            className={style.gamePageSettingBtn}
          >
            Change Difficulty
          </Button>
        </Link>
        <Link to="/" className={style.gamePageSetting}>
          <Button
            variant="contained"
            color="primary"
            className={style.gamePageSettingBtn}
          >
            Pause
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default GamePage;
