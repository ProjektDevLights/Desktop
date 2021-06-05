import { Light } from '@devlights/types';
import React from 'react';
import ColorCard from '../ColorCard';
import { useLight } from '../LightProvider';
import NameInput from '../NameInput';

const LightScreen = () => {
  const light: Light = useLight();
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <NameInput value={light.name} />
      <ColorCard />
    </div>
  );
};

export default LightScreen;
