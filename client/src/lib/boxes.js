import React from 'react';

import { Box } from 'grommet';

export const StandardBox = children => (
  <Box
    direction="column"
    pad={{
      left: 'small ',
      right: 'small',
      vertical: 'small',
    }}
    style={{ zIndex: '1' }}
  >
    {children}
  </Box>
);

export const LeftAlignBox = children => (
  <Box
    align={'start'}
    direction="column"
    pad={{
      left: 'large',
      right: 'large',
      vertical: 'small',
    }}
    style={{ zIndex: '1' }}
    fill={true}
  >
    {children}
  </Box>
);


export const ColumnBox = children => (
  <Box
    align={'start'}
    direction="column"
    pad={{
      left: 'large',
      right: 'large',
      vertical: 'small',
    }}
    style={{ zIndex: '1' }}
    fill={true}
  >
    {children}
  </Box>
);

export const RowBox = children => (
  <Box
    align={'start'}
    direction="row"
    pad={{
      left: 'large',
      right: 'large',
      vertical: 'small',
    }}
    style={{ zIndex: '1' }}
    fill={true}
  >
    {children}
  </Box>
);