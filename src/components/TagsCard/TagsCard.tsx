import {
  faCertificate,
  faCheck,
  faPlus,
  faTags,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconButton,
  InputAdornment,
  List,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import BasicCard from '../BasicCard';
import { useLight } from '../LightProvider';
import TagItem from '../TagItem';

const useStyles = makeStyles((theme: Theme) => ({
  description: {
    marginBottom: theme.spacing(2),
  },
  icon: {
    marginBottom: theme.spacing(1),
    color: theme.palette.secondary.main,
  },
  list: {
    width: '100%',
  },
  textField: {
    marginTop: theme.spacing(2),
    width: '90%',
  },
  plusIcon: {
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));
export default function TagsCard() {
  const light = useLight();
  const styles = useStyles();

  const [value, setValue] = React.useState<string>('');

  const confirmTag = () => {
    light.addTag(value);
    setValue('');
  };
  return (
    <BasicCard rotation={-2}>
      <Typography variant="h4">Tags</Typography>
      <Typography variant="body1" className={styles.description}>
        Add and remove tags
      </Typography>
      {!light.tags?.length ? (
        <>
          <FontAwesomeIcon size="3x" icon={faTags} className={styles.icon} />
          <Typography>The light currently has no tags attached!</Typography>
        </>
      ) : (
        <List className={styles.list}>
          {light.tags.map((tag: string, i: number) => (
            <TagItem
              key={tag}
              tag={tag}
              divider={i !== light.tags?.length - 1}
            />
          ))}
        </List>
      )}

      <TextField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            confirmTag();
          }
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={confirmTag} className={styles.plusIcon}>
                <FontAwesomeIcon icon={faPlus} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        placeholder="Enter tag..."
        className={styles.textField}
      />
    </BasicCard>
  );
}
