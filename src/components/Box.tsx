import * as React from 'react';
import classNames from 'classnames';
import { createStyles, Omit, withStyles, WithStyles } from '@material-ui/core';
import { Flex, FlexProps } from './Flex';
import { texture } from '../functions/texture';

export const styles = createStyles({
  box: {
    ...texture(require('../assets/box.png')),
    padding: 10
  },
  highlight: {
    ...texture(require('../assets/highlight.png'))
  }
});

export type BoxProps = WithStyles<typeof styles> &
  Omit<FlexProps, 'classes'> & {
    highlight?: boolean;
  };

export const Box = withStyles(styles)(
  React.forwardRef<HTMLDivElement, BoxProps>(
    ({ classes, children, className, highlight, ...divProps }, ref) => (
      <Flex
        innerRef={ref}
        direction="column"
        className={classNames(
          classes.box,
          { [classes.highlight]: highlight },
          className
        )}
        {...divProps}
      >
        {children}
      </Flex>
    )
  )
);
