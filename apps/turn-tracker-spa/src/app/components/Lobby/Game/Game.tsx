import React from 'react';
import { useAtom } from 'jotai';
import lobbyAtom from '../../../state/lobby';

export default function Game(): React.ReactElement {
  const [lobby] = useAtom(lobbyAtom);
  return <>game in progress</>;
}
