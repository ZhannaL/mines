import React from 'react';

import { CustomParams } from 'src/components/CustomParams';
import { NoSsr } from '@material-ui/core';

const Custom = (): JSX.Element => {
  return (
    <NoSsr>
      <CustomParams />
    </NoSsr>
  );
};

export default Custom;
