import { Light } from '@devlights/types';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { Tween } from 'react-gsap';
import { useLight } from '../LightProvider';

const useStyles = makeStyles((theme: Theme) => ({
  off: {
    backgroundColor: '#000',
  },
  plain: {
    backgroundColor: (light: Light) => light.leds.colors[0],
  },
  gradient: {
    background: (light: Light) =>
      `linear-gradient(120deg, ${light.leds.colors[0]}, ${light.leds.colors[1]})`,
  },
  running_root: {
    background: '#000',
    overflow: 'hidden',
  },
  running_box: {
    backgroundColor: (light: Light) => light.leds.colors[0],
    width: 60,
    height: 200,
    overflow: 'hidden',
    zIndex: 20,
    marginTop: -theme.spacing(2),
  },
}));
export default function LightBackground(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) {
  const { children, className, ...rest } = props;
  const light = useLight();
  const styles = useStyles(light);

  const rainbowRef = React.createRef<HTMLDivElement>();
  const duration = ((light.leds.timeout ?? 1000) / 1000) * 255 * 6;

  const colors = [
    '#ff0000',
    '#ffff00',
    '#00ff00',
    '#00ffff',
    '#0000ff',
    '#ff00ff',
  ];
  let colorIndex = 0;
  const changeBG = () => {
    setTimeout(() => {
      if (rainbowRef.current) {
        rainbowRef.current.style.backgroundColor =
          colors[colorIndex % colors.length];
        changeBG();
        colorIndex++;
      }
    }, light.leds.timeout ?? 1000 / 1000);
  };

  React.useEffect(() => {
    changeBG();
  }, []);

  if (!light.isOn) {
    return <div className={clsx(styles.off, className)}>{children}</div>;
  }

  switch (light.leds.pattern) {
    default:
    case 'plain':
      return (
        <div className={clsx(styles.plain, className)} {...rest}>
          {children}
        </div>
      );
    case 'gradient':
      return (
        <div className={clsx(styles.gradient, className)} {...rest}>
          {children}
        </div>
      );
    case 'runner':
      return (
        <div className={clsx(styles.running_root, className)}>
          <Tween
            from={{ x: '-16px' }}
            to={{ x: '324px' }}
            duration={
              ((light.leds.timeout ?? 1000) * (light.count * 0.85 + 1)) / 1000
            }
            ease={`steps(${light.count * 0.85 + 1})`}
            repeat={-1}
            yoyo
          >
            <div
              className={styles.running_box}
              style={{ transform: 'rotate(20deg) translateY(-50%) scaleY(2)' }}
            />
          </Tween>
          {children}
        </div>
      );
    case 'fading':
      return (
        <Tween
          duration={duration}
          to={{ backgroundColor: '#ff0000' }}
          easing="linear"
          keyframes={[
            { backgroundColor: '#ffff00' },
            { backgroundColor: '#00ff00' },
            { backgroundColor: '#00ffff' },
            { backgroundColor: '#0000ff' },
            { backgroundColor: '#ff00ff' },
            { backgroundColor: '#ff0000' },
          ]}
          repeat={-1}
        >
          <div className={className} style={{ backgroundColor: '#ff0000' }}>
            {children}
          </div>
        </Tween>
      );
    case 'rainbow':
      return (
        <div
          ref={rainbowRef}
          className={className}
          style={{ backgroundColor: '#ff0000' }}
        >
          {children}
        </div>
      );
  }
}
