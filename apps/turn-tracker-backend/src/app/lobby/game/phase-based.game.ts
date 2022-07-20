import {
  Game,
  GameConfigDto,
} from '@turn-tracker-nx-nestjs-react/turn-tracker-types';

export class PhaseBasedGame extends Game {
  getDefaultConfig(): GameConfigDto {
    const gameConfig = new GameConfigDto();
    gameConfig.canBeInfiniteTurns = true;
    gameConfig.editableTurns = true;
    return gameConfig;
  }
}
