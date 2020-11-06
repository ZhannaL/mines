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
  NoSsr,
} from '@material-ui/core';

import { GameInfoProvider } from './src/Provider/GameContext';

const theme = createMuiTheme({
  palette: {
    // type: 'dark',
    primary: {
      main: '#00b5ad',
    },
  },
});

export const wrapRootElement = ({ element }) => (
  <NoSsr>
    <GameInfoProvider>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {element}
        </MuiThemeProvider>
      </StylesProvider>
    </GameInfoProvider>
  </NoSsr>
);
