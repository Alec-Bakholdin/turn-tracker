import { Game } from './game';
import { GameConfigDto } from './game-config';

export class TurnBasedGame extends Game {
  getDefaultConfig(): GameConfigDto {
    const gameConfig = new GameConfigDto();
    gameConfig.userOrderMatters = true;
    gameConfig.editableTurns = true;
    gameConfig.canBeInfiniteTurns = true;
    return gameConfig;
  }
}
