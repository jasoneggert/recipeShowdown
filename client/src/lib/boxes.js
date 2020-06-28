import React from 'react';

import { Box } from 'grommet';

export const MainBox = (children) => (
  <Box
    background={'background'}
    tag="content"
    animation={'fadeIn'}
    direction="column"
    align="center"
    justify="between"
    pad={{
      left: 'large',
      right: 'large',
      top: 'small',
      bottom: 'large',
    }}
    elevation="medium"
    style={{ zIndex: '1' }}
    fill={true}
  >
    {children}
  </Box>
);

export const ContentBox = (children) => (
  <Box
    background={'background'}
    tag="content"
    animation={'fadeIn'}
    direction="column"
    align="center"
    justify="between"
    pad={{
      left: 'large',
      right: 'large',
      top: 'none',
      bottom: 'large',
    }}
    elevation="none"
    style={{ zIndex: '1' }}
    fill={true}
  >
    {children}
  </Box>
);

export const StandardBox = (children) => (
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

export const LeftAlignBox = (children) => (
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

export const ColumnBox = (children) => (
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

export const RowBox = (children) => (
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
