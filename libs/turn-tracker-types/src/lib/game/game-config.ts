export class GameConfigDto {
  userOrderMatters = false;
  editableTurns = false;
  canBeInfiniteTurns = false;

  isInfiniteTurns = false;
  numTurns?: number;
}

export const INVALID_CONFIG_EXCEPTION = 'InvalidConfigException';
