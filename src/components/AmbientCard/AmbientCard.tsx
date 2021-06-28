import { makeStyles, Theme, Typography } from '@material-ui/core';
import { ipcRenderer } from 'electron';
import React from 'react';
import BasicCard from '../BasicCard';
import Display from '../Display';

const useStyles = makeStyles((theme: Theme) => ({
  displayContainer: { display: 'inline', marginTop: theme.spacing(2) },
}));
export interface AmbientCardProps {}
export default function AmbientCard(props: AmbientCardProps) {
  const [displays, setDisplays] = React.useState<Electron.Display[]>([]);
  const styles = useStyles();
  React.useEffect(() => {
    ipcRenderer.invoke('get-screens').then((dps: Electron.Display[]) => {
      setDisplays(dps);
    });
  }, []);
  return (
    <BasicCard rotation={-1}>
      <Typography variant="h4">AmbiLight</Typography>
      <Typography variant="body1">Start an ambilight on this light</Typography>
      <div className={styles.displayContainer}>
        {displays.map((dp: Electron.Display) => (
          <Display key={dp.id} display={dp} />
        ))}
      </div>
    </BasicCard>
  );
}
