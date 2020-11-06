/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
import React from 'react';
import { NoSsr } from '@material-ui/core';

export const wrapRootElement = ({ element }) => <NoSsr>{element}</NoSsr>;
