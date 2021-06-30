import { makeStyles, Theme, Typography } from '@material-ui/core';
import { ipcRenderer } from 'electron';
import { find, map, mapValues, max, min } from 'lodash';
import React from 'react';
import BasicCard from '../BasicCard';
import Display from '../Display';

const useStyles = makeStyles((theme: Theme) => ({
  displayContainer: {
    position: 'relative',
    width: (props: { size: Electron.Size }) => props.size.width / 8,
    height: (props: { size: Electron.Size }) => props.size.height / 8,

    marginTop: theme.spacing(2),
  },
}));
export interface AmbientCardProps {}
export default function AmbientCard(props: AmbientCardProps) {
  const [displays, setDisplays] = React.useState<Electron.Display[]>([]);

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
    if (dps.length) {
      dps = dps.map((dp: Electron.Display) => {
        dp.bounds = mapValues(dp.bounds, (value: number) => value / 8);
        return dp;
      });
      const minX = min(map(displays, 'bounds.x'));
      const minY = min(map(displays, 'bounds.y'));
      console.log('transform ' + map(displays, 'bounds.x'));

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
      <Typography variant="body1">Start an ambilight on this light</Typography>
      <div className={styles.displayContainer}>
        {transformDisplays(displays).map((dp: Electron.Display, i) => {
          dp.id = i + 1;
          return <Display key={dp.id} display={dp} />;
        })}
      </div>
    </BasicCard>
  );
}
