import * as React from "react";
import Dice from "react-dice-roll";
import {Typography} from "@mui/material";

//I have no idea what these commands do but Webstorm told me to put them in
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function DiceRoll({size,rollingTime,placement}) {
  return (
    <div className="App">
      <Typography className = "text-center">Roll D6</Typography>
  <Dice size = {size} rollingTime = {rollingTime} placement = {placement}/>
  </div>
);
}
