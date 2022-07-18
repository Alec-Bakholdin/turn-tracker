import { Game } from './game';
import { TurnBasedGame } from './turn-based.game';
import { PhaseBasedGame } from './phase-based.game';
import { GameType } from './game-types';

export class GameFactory {
  static getGame(gameType: GameType): Game {
    switch (gameType) {
      case 'Turn Based':
        return new TurnBasedGame();
      case 'Phase Based':
        return new PhaseBasedGame();
      default:
        throw new Error(`Game type ${gameType} is not yet supported`);
    }
  }
}
