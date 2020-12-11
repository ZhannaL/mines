/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it

import React from 'react';
import {
  StylesProvider,
  CssBaseline,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core';

import { GameInfoProvider } from './src/Provider/GameContext';
import { GameTimeProvider } from './src/Provider/TimeContext';

const theme = createMuiTheme({
  palette: {
    // type: 'dark',
    primary: {
      main: '#00b5ad',
    },
  },
});

export const wrapRootElement = ({ element }) => (
  <GameTimeProvider>
    <GameInfoProvider>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {element}
        </MuiThemeProvider>
      </StylesProvider>
    </GameInfoProvider>
  </GameTimeProvider>
);
