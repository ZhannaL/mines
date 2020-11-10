import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'gatsby';
import { Button, Typography } from '@material-ui/core';
import { getInnerWidth, getInnerHeight } from 'src/hooks/getInnerSize';
import style from './homePage.module.css';
import { useGameInfo } from '../../Provider/GameContext';

export const HomePage = (): JSX.Element => {
  const [, setGameState] = useGameInfo();

  const [homePageWrapperWidth, setHomePageWrapperWidth] = useState(0);
  const [homePageWrapperHeight, setHomePageWrapperHeight] = useState(0);

  const ref = useRef(null);
  const homePageWrapper = useCallback((node) => {
    ref.current = node;
    if (node !== null) {
      setHomePageWrapperWidth(getInnerWidth(node));
      setHomePageWrapperHeight(getInnerHeight(node));
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const node = ref.current;
      if (node !== null) {
        setHomePageWrapperWidth(getInnerWidth(node));
        setHomePageWrapperHeight(getInnerHeight(node));
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={homePageWrapper} style={{ minWidth: '60vw', height: '100vh' }}>
      <div
        style={{
          width: `${
            homePageWrapperWidth < 712
              ? homePageWrapperWidth
              : homePageWrapperHeight
          }px`,
          height: `${
            homePageWrapperWidth >= 712
              ? homePageWrapperHeight
              : homePageWrapperWidth
          }px`,
        }}
        className={style.homePageBtns}
      >
        <Link to="/game/" className={style.homePageLink}>
          <Button
            variant="contained"
            color="primary"
            className={style.homePageBtn}
            onClick={() => {
              setGameState({
                width: 8,
                height: 8,
                mines: 15,
              });
              localStorage.setItem(
                'params',
                JSON.stringify({ width: 8, height: 8, mines: 15 })
              );
            }}
          >
            <Typography variant="h6">
              <b>
                8 x 8
                <br />
                10 mines
              </b>
            </Typography>
          </Button>
        </Link>
        <Link to="/game/" className={style.homePageLink}>
          <Button
            variant="contained"
            color="primary"
            className={style.homePageBtn}
            onClick={() => {
              setGameState({
                width: 16,
                height: 16,
                mines: 15.5,
              });
              localStorage.setItem(
                'params',
                JSON.stringify({ width: 16, height: 16, mines: 15.5 })
              );
            }}
          >
            <Typography variant="h6">
              <b>
                16 x 16
                <br />
                40 mines
              </b>
            </Typography>
          </Button>
        </Link>
        <Link to="/game/" className={style.homePageLink}>
          <Button
            variant="contained"
            color="primary"
            className={style.homePageBtn}
            onClick={() => {
              setGameState({
                width: 30,
                height: 16,
                mines: 20.5,
              });
              localStorage.setItem(
                'params',
                JSON.stringify({ width: 30, height: 16, mines: 20.5 })
              );
            }}
          >
            <Typography variant="h6">
              <b>
                30 x 16
                <br />
                99 mines
              </b>
            </Typography>
          </Button>
        </Link>
        <Link to="/custom/" className={style.homePageLink}>
          <Button
            variant="contained"
            color="primary"
            className={style.homePageBtn}
          >
            <Typography variant="h6">
              <b>
                ?
                <br />
                Custom
              </b>
            </Typography>
          </Button>
        </Link>
      </div>
    </div>
  );
};
