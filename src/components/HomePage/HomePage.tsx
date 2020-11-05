import React from 'react';
import { Link } from 'gatsby';
import { Button } from '@material-ui/core';
import style from './homePage.module.css';
import { useGameInfo } from '../../Provider/GameContext';

export const HomePage = (): JSX.Element => {
  const [, setGameState] = useGameInfo();
  return (
    <div className={style.homePageBtns}>
      <Link to="/game/" className={style.homePageLink}>
        <Button
          variant="contained"
          color="primary"
          className={style.homePageBtn}
          onClick={() =>
            setGameState({
              width: 8,
              height: 8,
              mines: 10,
            })
          }
        >
          8 x 8
          <br />
          10 mines
        </Button>
      </Link>
      <Link to="/game/" className={style.homePageLink}>
        <Button
          variant="contained"
          color="primary"
          className={style.homePageBtn}
          onClick={() =>
            setGameState({
              width: 16,
              height: 16,
              mines: 40,
            })
          }
        >
          16 x 16
          <br />
          40 mines
        </Button>
      </Link>
      <Link to="/game/" className={style.homePageLink}>
        <Button
          variant="contained"
          color="primary"
          className={style.homePageBtn}
          onClick={() =>
            setGameState({
              width: 30,
              height: 16,
              mines: 99,
            })
          }
        >
          30 x 16
          <br />
          99 mines
        </Button>
      </Link>
      <Link to="/custom/" className={style.homePageLink}>
        <Button
          variant="contained"
          color="primary"
          className={style.homePageBtn}
        >
          ?
          <br />
          Custom
        </Button>
      </Link>
    </div>
  );
};
