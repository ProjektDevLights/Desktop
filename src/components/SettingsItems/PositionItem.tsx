import {
  faAngleDoubleDown,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleDoubleUp,
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faListOl,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  ButtonGroup,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Theme,
  Tooltip,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useLight } from '../LightProvider';
const useStyles = makeStyles((theme: Theme) => ({
  posText: {
    margin: theme.spacing(1),
    fontWeight: 'bold',
  },
}));
export default function PositionItem() {
  const light = useLight();
  const styles = useStyles();
  return (
    <ListItem>
      <ListItemIcon>
        <FontAwesomeIcon size="2x" icon={faListOl} />
      </ListItemIcon>
      <ListItemText>Position</ListItemText>
      <ListItemSecondaryAction>
        <Grid container alignItems="center">
          <ButtonGroup>
            <Tooltip title="Move to bottom">
              <Button onClick={light.moveToBottom}>
                <FontAwesomeIcon icon={faAngleDoubleDown} />
              </Button>
            </Tooltip>
            <Tooltip title="Move one down">
              <Button onClick={light.moveDown}>
                <FontAwesomeIcon icon={faAngleDown} />
              </Button>
            </Tooltip>
          </ButtonGroup>
          <Typography className={styles.posText} variant="h5">
            {light.position}
          </Typography>
          <ButtonGroup>
            <Tooltip title="Move one up">
              <Button onClick={light.moveUp}>
                <FontAwesomeIcon icon={faAngleUp} />
              </Button>
            </Tooltip>
            <Tooltip title="Move to top">
              <Button onClick={light.moveToTop}>
                <FontAwesomeIcon icon={faAngleDoubleUp} />
              </Button>
            </Tooltip>
          </ButtonGroup>
        </Grid>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
