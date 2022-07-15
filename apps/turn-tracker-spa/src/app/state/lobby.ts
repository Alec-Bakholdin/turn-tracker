import { atom } from 'jotai';
import { LobbyDto } from '@turn-tracker-nx-nestjs-react/turn-tracker-types';

export const lobbyAtom = atom<LobbyDto>(new LobbyDto());
export default lobbyAtom;
