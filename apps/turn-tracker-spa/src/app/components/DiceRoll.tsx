import * as React from 'react';
import Dice from 'react-dice-roll';
import { Typography } from '@mui/material';

export default function DiceRoll(props: {
  size: number;
  rollingTime: number;
  placement: string;
}) {
  const { size, rollingTime, placement } = props;
  return (
    <div className="App">
      <Typography className="text-center">Roll D6</Typography>
      <Dice size={size} rollingTime={rollingTime} placement={placement} />
    </div>
  );
}
