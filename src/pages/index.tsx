import React from 'react';
import { Link } from 'gatsby';
import { HomePage } from '../components/HomePage';

const IndexPage = (): JSX.Element => {
  return (
    <div>
      <HomePage />
      <Link to="/game/">Go to Game</Link> <br />
    </div>
  );
};

export default IndexPage;
