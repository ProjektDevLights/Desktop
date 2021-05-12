import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chip, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

export interface TagChipProps {
  tag: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginRight: theme.spacing(1),
  },
  icon: {
    height: '13px !important',
    width: '13px !important',
  },
}));
const TagChip = (props: TagChipProps) => {
  const { tag } = props;
  const styles = useStyles();
  return (
    <Chip
      size="small"
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      avatar={
        <FontAwesomeIcon size="xs" className={styles.icon} icon={faHashtag} />
      }
      className={styles.root}
      label={tag}
    />
  );
};

export default TagChip;
