export class GameConfigDto {
  userOrderMatters = false;
  editableTurns = false;
  canBeInfiniteTurns = false;

  isInfiniteTurns = false;
  numTurns?: number;
}

export const UPDATE_GAME_CONFIG_EVENT = 'updateGameConfig';
