import React from 'react';
import { Helmet } from 'react-helmet';
import { HomePage } from '../components/HomePage';

const IndexPage = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Mines App</title>
      </Helmet>
      <HomePage />
    </>
  );
};

export default IndexPage;
