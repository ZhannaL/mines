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
  // MuiThemeProvider,
} from '@material-ui/core';

export const wrapRootElement = ({ element }) => (
  <StylesProvider injectFirst>
    {/* <MuiThemeProvider theme={theme}> */}
    <CssBaseline />
    {element}
    {/* </MuiThemeProvider> */}
  </StylesProvider>
);
