import * as React from 'react';
import Dice from 'react-dice-roll';

export default function DiceRoll(props: {
  size: number;
  rollingTime: number;
  triggers: string[];
}) {
  const { size, rollingTime, triggers} = props;
  return (
    <div>
      <Dice size={size} rollingTime={rollingTime} triggers = {triggers}/>
    </div>
  );
}
