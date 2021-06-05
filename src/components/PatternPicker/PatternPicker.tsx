import { Pattern } from '@devlights/types';
import {
  faFill,
  faPaintBrush,
  faRainbow,
  faRetweet,
  faRunning,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import React from 'react';
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  icon: {
    width: 52,
    height: 52,
  },
}));
export interface PatternPickerProps {
  pattern: Pattern;
  onChange: (newPattern: string) => void;
}
export default function PatternPicker(props: PatternPickerProps) {
  const styles = useStyles();
  const [pattern, setPattern] = React.useState<Pattern>(props.pattern);

  const handlePattern = (
    e: React.MouseEvent<HTMLElement>,
    newPattern: Pattern
  ) => {
    setPattern(newPattern);
    props.onChange(newPattern);
  };
  return (
    <ToggleButtonGroup
      className={styles.root}
      size="large"
      value={pattern}
      exclusive
      onChange={handlePattern}
    >
      <ToggleButton className={styles.icon} value="plain">
        <FontAwesomeIcon size="lg" icon={faFill} />
      </ToggleButton>
      <ToggleButton className={styles.icon} value="gradient">
        <FontAwesomeIcon size="lg" icon={faPaintBrush} />
      </ToggleButton>
      <ToggleButton className={styles.icon} value="runner">
        <FontAwesomeIcon size="lg" icon={faRunning} />
      </ToggleButton>
      <ToggleButton className={styles.icon} value="fading">
        <FontAwesomeIcon size="lg" icon={faRetweet} />
      </ToggleButton>
      <ToggleButton className={styles.icon} value="rainbow">
        <FontAwesomeIcon size="lg" icon={faRainbow} />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
