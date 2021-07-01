import { Button, makeStyles, Theme, Typography } from '@material-ui/core';
import { ipcRenderer } from 'electron';
import { find, isEqual, map, max, min, uniqWith } from 'lodash';
import React from 'react';
import BasicCard from '../BasicCard';
import Display from '../Display';

const useStyles = makeStyles((theme: Theme) => ({
  displayContainer: {
    position: 'relative',
    width: (props: { size: Electron.Size }) => props.size.width / 8,
    height: (props: { size: Electron.Size }) => props.size.height / 8,
  },
  desc: {
    marginBottom: theme.spacing(2),
  },
  selectTypo: {
    alignSelf: 'start',
  },
  button: {
    marginTop: theme.spacing(2),
    alignSelf: 'flex-end',
  },
}));
export interface AmbientCardProps {}
export default function AmbientCard(props: AmbientCardProps) {
  const [displays, setDisplays] = React.useState<Electron.Display[]>([]);
  const [selected, setSelected] = React.useState<number>();

  const calcSpace = (dps: Electron.Display[]): Electron.Size => {
    const dpMaxX = find(
      dps,
      (dp: Electron.Display) => dp.bounds.x === max(map(displays, 'bounds.x'))
    );
    const dpMaxY = find(
      dps,
      (dp: Electron.Display) => dp.bounds.y === max(map(displays, 'bounds.y'))
    );
    return {
      height: dpMaxY?.bounds.y + dpMaxY?.size.height ?? 1080,
      width: dpMaxX?.bounds.x + dpMaxX?.size.width ?? 1920,
    };
  };

  const transformDisplays = (dps: Electron.Display[]): Electron.Display[] => {
    dps = uniqWith(dps, (a: Electron.Display, b: Electron.Display) =>
      isEqual(a.bounds, b.bounds)
    );
    if (dps.length) {
      const minX = min(map(displays, 'bounds.x'));
      const minY = min(map(displays, 'bounds.y'));
      if (minX < 0) {
        dps = dps.map((dp: Electron.Display) => {
          dp.bounds.x -= minX;

          return dp;
        });
      }
      if (minY < 0) {
        dps = dps.map((dp: Electron.Display) => {
          dp.bounds.y -= minY;
          return dp;
        });
      }
      return dps;
    }
    return [];
  };

  const styles = useStyles({ size: calcSpace(transformDisplays(displays)) });
  React.useEffect(() => {
    ipcRenderer.invoke('get-screens').then((dps: Electron.Display[]) => {
      setDisplays(dps);
      calcSpace(dps);
    });
    ipcRenderer.on(
      'displays-changed',
      (_e: Electron.IpcRendererEvent, dps: Electron.Display[]) => {
        setDisplays(dps);
      }
    );
  }, []);

  return (
    <BasicCard rotation={-1}>
      <Typography variant="h4">AmbiLight</Typography>
      <Typography variant="body1" className={styles.desc}>
        Start an ambilight on this light
      </Typography>
      <Typography variant="body1" className={styles.selectTypo}>
        Select display:
      </Typography>
      <div className={styles.displayContainer}>
        {transformDisplays(displays).map((dp: Electron.Display, i) => {
          dp.id = i + 1;
          return (
            <Display
              onSelected={() => setSelected(i)}
              selected={selected === i}
              key={dp.id}
              display={dp}
            />
          );
        })}
      </div>
      <Button className={styles.button} variant="contained" color="secondary">
        Start
      </Button>
    </BasicCard>
  );
}
