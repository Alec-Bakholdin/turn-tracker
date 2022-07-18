import { Game } from './game';
import { GameConfigDto } from './game-config';

export class PhaseBasedGame extends Game {
  getDefaultConfig(): GameConfigDto {
    const gameConfig = new GameConfigDto();
    gameConfig.canBeInfiniteTurns = true;
    gameConfig.editableTurns = true;
    return gameConfig;
  }
}
