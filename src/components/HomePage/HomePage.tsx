import React from 'react';
import { Button } from '@material-ui/core';
import style from './homePage.module.css';

export const HomePage = (): JSX.Element => {
  return (
    <div className={style.homePageBtns}>
      <Button variant="contained" color="primary" className={style.homePageBtn}>
        8 x 8
        <br />
        10 mines
      </Button>
      <Button variant="contained" color="primary" className={style.homePageBtn}>
        16 x 16
        <br />
        40 mines
      </Button>
      <Button variant="contained" color="primary" className={style.homePageBtn}>
        30 x 16
        <br />
        99 mines
      </Button>
      <Button variant="contained" color="primary" className={style.homePageBtn}>
        ?
        <br />
        Custom
      </Button>
    </div>
  );
};
