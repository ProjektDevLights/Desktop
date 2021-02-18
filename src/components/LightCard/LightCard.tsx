import { Light } from '@devlights/types';
import { Card, CardContent, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import React from 'react';
import tinycolor from "tinycolor2";
import Powerbulb from '../PowerBulb';
import TagChip from '../TagChip';
export interface LightCardProps{
  light: Light
}

const getBackground = (light: Light): string => {
  if(light.isOn){
    switch(light.leds.pattern){
      case "plain":
        return light.leds.colors[0];
      case "gradient":
        return `linear-gradient(120deg, ${light.leds.colors[0]}, ${light.leds.colors[1]})`
    }
    return "";
  } else {
    return "#000"
  }
}
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(2),
    width: 400,
    height: 200,
    marginRight: theme.spacing(3),
    borderRadius: 20
  },
  paper:{
    background: (props: LightCardProps) => getBackground(props.light),
    height: "40%",
    position: "relative",
    transition: theme.customs.colorTransition
  },
  name: {
    color: (props: LightCardProps) => props.light.isOn ?  tinycolor(props.light.leds.colors[0]).isLight() ? "#000" : "#fff" : "#fff",
    position: "relative",
    top: theme.spacing(2),
    left: theme.spacing(2)
  }
}));
function LightCard(props: LightCardProps) {
  const {light} = props;

  const styles = useStyles(props);

  return (
    <Card className={styles.root}>
      <Paper className={styles.paper} square elevation={0} >
      <Typography variant="h5" className={styles.name}>{light.name}</Typography>
          <Powerbulb light={light} />
        </Paper>
      <CardContent>
        {light.tags?.map((tag: string) => <TagChip  tag={tag}/>)}
      </CardContent>
    </Card>
  )
}

export default LightCard
