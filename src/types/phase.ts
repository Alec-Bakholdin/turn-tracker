import { randomString } from "../util";

export interface Phase {
  id: string;
  name: string;
  simultaneous: boolean;
}

export type PhaseMap = {[id: string]: Phase};

export function newPhase(): Phase {
  return {
    id: randomString(10),
    name: "",
    simultaneous: false,
  }
}