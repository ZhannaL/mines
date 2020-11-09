import React from 'react';
import { Helmet } from 'react-helmet';
import { HomePage } from '../components/HomePage';

const IndexPage = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <link rel="icon" href="/src/images/mine-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <title>Mines App</title>
        <meta name="description" content="Mines application" />
      </Helmet>
      <HomePage />
    </>
  );
};

export default IndexPage;
