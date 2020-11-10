import React from 'react';
import { Helmet } from 'react-helmet';
import { HomePage } from '../components/HomePage';

const IndexPage = (): JSX.Element => {
  return (
    <>
      <Helmet defer={false}>
        <html lang="en" />
        <title itemProp="name" lang="en">
          Mine App
        </title>
        <meta charSet="utf-8" />
        <link rel="icon" href="/src/images/mine-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Mine App" />
        {/* <base target="_blank" href="https://mines-react.netlify.app/" /> */}
        <link rel="canonical" href="https://mines-react.netlify.app/" />
        <noscript>You need to enable JavaScript to run this app.</noscript>
      </Helmet>
      <HomePage />
    </>
  );
};

export default IndexPage;
