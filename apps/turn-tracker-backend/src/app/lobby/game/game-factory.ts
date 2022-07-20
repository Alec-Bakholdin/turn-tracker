import {
  Game,
  GameType,
  Lobby,
} from '@turn-tracker-nx-nestjs-react/turn-tracker-types';
import { TurnBasedGame } from './turn-based.game';
import { PhaseBasedGame } from './phase-based.game';

export class GameFactory {
  static getGame(lobby: Lobby, gameType: GameType): Game {
    switch (gameType) {
      case 'Turn Based':
        return new TurnBasedGame(lobby);
      case 'Phase Based':
        return new PhaseBasedGame(lobby);
      default:
        throw new Error(`Game type ${gameType} is not yet supported`);
    }
  }
}
