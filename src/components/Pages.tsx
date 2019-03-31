import * as React from 'react';
import classNames from 'classnames';
import { createStyles, Omit, WithStyles, withStyles } from '@material-ui/core';
import { PageIcons } from './PageIcons';
import { noop } from '../functions/noop';
import { InlineActionButton } from './InlineActionButton';
import { Row } from './Row';

const styles = createStyles({
  pages: {
    display: 'flex',
    position: 'relative'
  },
  page: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  toggle: {
    position: 'absolute',
    bottom: 40,
    right: 40
  }
});

export type PagesProps = WithStyles<typeof styles> &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'value' | 'onChange'> & {
    value?: number;
    onChange?: (newIndex: number) => any;
    children?: React.ReactElement | React.ReactElement[];
  };

export const Pages = withStyles(styles)((props: PagesProps) => {
  const {
    children = [],
    value = 0,
    onChange = noop,
    classes,
    className,
    ...divProps
  } = props;
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement[];
  const currentPage = childrenArray[value];
  const currentPageWithStyle = React.cloneElement(currentPage, {
    ...currentPage.props,
    className: classNames(classes.page, currentPage.props.className)
  });
  const changeToNextPage = () => onChange((value + 1) % childrenArray.length);
  return (
    <div {...divProps} className={classNames(classes.pages, className)}>
      {currentPageWithStyle}
      {childrenArray.length > 1 && (
        <Row valign="center" className={classes.toggle}>
          <InlineActionButton input="Y" callback={changeToNextPage} />
          <PageIcons
            value={value}
            count={childrenArray.length}
            onChange={onChange}
          />
        </Row>
      )}
    </div>
  );
});
