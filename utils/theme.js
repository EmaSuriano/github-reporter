import { deepMerge } from 'grommet/utils';
import { grommet } from 'grommet/themes';

const theme = deepMerge(grommet, {
  global: {
    breakpoints: {
      xsmall: {
        value: 500,
      },
      small: {
        value: 800,
      },
      medium: undefined,
      middle: {
        value: 3000,
      },
    },
  },
});

export default theme;
