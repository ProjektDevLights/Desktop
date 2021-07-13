import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, makeStyles, Theme, Typography } from '@material-ui/core';
import { ipcRenderer } from 'electron';
import { filter, find, isEqual, map, max, min, uniqWith } from 'lodash';
import { PythonShell } from 'python-shell';
import React from 'react';
import BasicCard from '../BasicCard';
import Display from '../Display';
import LightOff from '../LightOff';
import { useLight } from '../LightProvider';
import RectFields from '../RectFields';
import useSnackbar from '../SnackbarProvider/useSnackbar';

const useStyles = makeStyles((theme: Theme) => ({
  displayContainer: {
    position: 'relative',
    width: (props: { size: Electron.Size }) => props.size.width / 8,
    height: (props: { size: Electron.Size }) => props.size.height / 8,
    marginBottom: theme.spacing(2),
  },
  desc: {
    marginBottom: theme.spacing(2),
  },
  selectTypo: {
    alignSelf: 'start',
  },
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    width: 'fit-content',
    flex: 'auto',
    flexGrow: 0,
  },
  playIcon: {
    marginRight: theme.spacing(1),
  },
  icon: {
    color: theme.palette.secondary.main,
    margin: theme.spacing(1),
  },
  iconButton: {
    width: 100,
    height: 100,
  },
  buttonWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));
export interface AmbientCardProps {}
export default function AmbientCard(props: AmbientCardProps) {
  const light = useLight();
  const snackbar = useSnackbar();
  const [displays, setDisplays] = React.useState<Electron.Display[]>([]);
  const [selected, setSelected] = React.useState<number>();
  const [rect, setRect] = React.useState<Electron.Size>({
    height: 0,
    width: 0,
  });
  const [run, setRun] = React.useState<PythonShell>();

  const calcSpace = (dps: Electron.Display[]): Electron.Size => {
    let dpMaxX = filter(
      dps,
      (dp: Electron.Display) => dp.bounds.x === max(map(displays, 'bounds.x'))
    );
    if (dpMaxX.length > 1) {
      dpMaxX = [
        find(
          dpMaxX,
          (dp: Electron.Display) =>
            dp.bounds.width === max(map(dpMaxX, 'bounds.width'))
        ) as Electron.Display,
      ];
    }

    let dpMaxY = filter(
      dps,
      (dp: Electron.Display) => dp.bounds.y === max(map(dps, 'bounds.y'))
    );
    if (dpMaxY.length > 1) {
      dpMaxY = [
        find(
          dps,
          (dp: Electron.Display) =>
            dp.bounds.height === max(map(dpMaxY, 'bounds.height'))
        ) as Electron.Display,
      ];
    }
    return {
      height: dpMaxY[0]?.bounds.y + dpMaxY[0]?.size.height ?? 1080,
      width: dpMaxX[0]?.bounds.x + dpMaxX[0]?.size.width ?? 1920,
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

  const handleConfirm = () => {
    console.log(selected);
    if (selected === undefined) return;

    if (run) run.kill();
    // args: file x y width height leds_horizontal leds_vertical id
    const ambirun = PythonShell.run(
      'ambidevlight_bg_run.py',
      {
        scriptPath: 'src/python/',
        args: [
          displays[selected].workArea.x.toString(),
          displays[selected].workArea.y.toString(),
          displays[selected].workArea.width.toString(),
          displays[selected].workArea.height.toString(),
          rect.width.toString(),
          rect.height.toString(),
          light.id,
        ],
      },
      (err, res) => {
        console.log(err);
      }
    );
    setRun(ambirun);
    setRect({ width: 0, height: 0 });
    setSelected(undefined);
    snackbar.show(`Successfully started ambilight on screen ${selected + 1}!`);
  };

  return (
    <BasicCard>
      <Typography variant="h4">AmbiLight</Typography>
      <Typography variant="body1" className={styles.desc}>
        Start an ambilight on this light
      </Typography>
      {light.isOn ? (
        <>
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
          {selected !== undefined && (
            <RectFields value={rect} onChange={setRect} />
          )}
          <div className={styles.buttonWrapper}>
            {run && (
              <Button
                className={styles.button}
                variant="contained"
                color="secondary"
                onClick={() => {
                  run.kill();
                  snackbar.show('Stopped ambilight!', 'success');
                  setRun(undefined);
                }}
              >
                <FontAwesomeIcon className={styles.playIcon} icon={faStop} />{' '}
                Stop
              </Button>
            )}
            {rect.height !== 0 && rect.width !== 0 && (
              <Button
                className={styles.button}
                variant="contained"
                color="secondary"
                onClick={handleConfirm}
              >
                <FontAwesomeIcon className={styles.playIcon} icon={faPlay} />{' '}
                Start
              </Button>
            )}
          </div>
        </>
      ) : (
        <LightOff />
      )}
    </BasicCard>
  );
}
