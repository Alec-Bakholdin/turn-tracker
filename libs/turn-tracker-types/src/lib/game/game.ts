import { GameConfigDto } from './game-config';

export abstract class Game {
  abstract getDefaultConfig(): GameConfigDto;

  updateConfig(
    oldConfig: GameConfigDto,
    configUpdate: Partial<GameConfigDto>
  ): GameConfigDto {
    return Object.assign({ ...oldConfig }, configUpdate);
  }
}
