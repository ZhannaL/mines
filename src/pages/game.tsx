import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'gatsby';
import { Button } from '@material-ui/core';
import { getInnerWidth, getInnerHeight } from 'src/hooks/getInnerSize';
import { MinesInfo } from 'src/components/MinesInfo';
import { GameStatus } from 'src/hooks/types';
import { GameField } from '../components/GameField';
import style from './game.module.css';
import { useGameInfo } from '../Provider/GameContext';

const GamePage = (): JSX.Element => {
  const [gameState] = useGameInfo();
  const { width, height, mines } = gameState;

  const [gameFieldwrapperWidth, setGameFieldwrapperWidth] = useState(0);
  const [gameFieldwrapperHeight, setGameFieldwrapperHeight] = useState(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>('none');
  const [flagsOnField, setFlagsOnField] = useState(0);
  const [gameID, setGameID] = useState(0);

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
          gameID={gameID}
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
          onChangeGameStatus={setGameStatus}
          onChangeFlagsOnField={setFlagsOnField}
        />
      </div>

      <div className={style.gamePageSettings}>
        <div className={style.gamePageSettingsMines}>
          <MinesInfo gameStatus={gameStatus} flagsOnField={flagsOnField} />
        </div>
        {gameStatus === 'finished' ? (
          <div className={style.message}>
            Congrats!
            <br /> You won this game!
          </div>
        ) : (
          ''
        )}
        {gameStatus === 'lost' ? (
          <div className={style.message}>
            Sorry! <br />
            You lost!
          </div>
        ) : (
          ''
        )}
        <div className={style.gamePageSettingsBtns}>
          <Link to="/game/" className={style.gamePageSetting}>
            <Button
              variant="contained"
              color="primary"
              className={style.gamePageSettingBtn}
              onClick={() => {
                setGameID(gameID + 1);
              }}
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
        </div>
      </div>
    </div>
  );
};

export default GamePage;
