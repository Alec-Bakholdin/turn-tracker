import {
  Game,
  GameConfigDto,
  INVALID_CONFIG_EXCEPTION,
  LobbyDto,
  NOT_YOUR_TURN_EXCEPTION,
  UserException,
} from '@turn-tracker-nx-nestjs-react/turn-tracker-types';

export class TurnBasedGame extends Game {
  override start() {
    const { gameConfig, userOrder, activeUserSet, waitingUserSet } = this.lobby;
    if (
      (userOrder?.length ?? 0) < 1 ||
      (!gameConfig.isInfiniteTurns && gameConfig.numTurns === 0)
    ) {
      throw new UserException(
        INVALID_CONFIG_EXCEPTION,
        'Invalid config for Turn Based Game'
      );
    }
    this.lobby.turn = 1;
    this.lobby.status = 'inProgress';
    this.lobby.activeUserIndex = 0;
    activeUserSet.clear();
    activeUserSet.add(userOrder[0]);
    waitingUserSet.clear();
    userOrder.slice(1).forEach((userId) => waitingUserSet.add(userId));
  }

  playerReady(playerId: string): Partial<LobbyDto> {
    const {
      userOrder,
      activeUserSet,
      turn: oldTurn,
      activeUserIndex: oldIndex,
    } = this.lobby;
    const numUsers = userOrder.length;
    if (!activeUserSet.has(playerId)) {
      throw new UserException(NOT_YOUR_TURN_EXCEPTION, 'It is not your turn');
    }
    const newIndex = (oldIndex + 1) % numUsers;
    const newTurn = oldTurn + (newIndex !== oldIndex ? 1 : 0);

    return {
      ...this.setNewActiveUser(oldIndex, newIndex),
      ...this.advanceTurn(oldTurn, newTurn),
    };
  }

  private setNewActiveUser(
    oldIndex: number,
    newIndex: number
  ): Partial<LobbyDto> {
    const { userOrder } = this.lobby;

    this.lobby.activeUserIndex = newIndex;
    this.lobby.waitingUserSet.add(userOrder[newIndex]);
    this.lobby.waitingUserSet.delete(userOrder[oldIndex]);
    this.lobby.activeUserSet.clear();
    this.lobby.activeUserSet.add(userOrder[newIndex]);

    return {
      activeUserIndex: newIndex,
      activeUsers: Array.from(this.lobby.activeUserSet),
      waitingUsers: Array.from(this.lobby.waitingUserSet),
    };
  }

  private advanceTurn(oldTurn: number, newTurn: number): Partial<LobbyDto> {
    if (oldTurn === newTurn) {
      return {};
    }
    this.lobby.turn = newTurn;
    return { turn: newTurn };
  }

  getDefaultConfig(): GameConfigDto {
    const gameConfig = new GameConfigDto();
    gameConfig.userOrderMatters = true;
    gameConfig.editableTurns = true;
    gameConfig.canBeInfiniteTurns = true;
    return gameConfig;
  }
}
