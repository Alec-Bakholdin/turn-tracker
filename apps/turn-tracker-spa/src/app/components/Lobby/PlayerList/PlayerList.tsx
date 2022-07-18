import React, { useEffect, useState } from 'react';
import {
  GameConfigDto,
  LobbyDto,
  User,
} from '@turn-tracker-nx-nestjs-react/turn-tracker-types';
import { Box, Typography } from '@mui/material';
import DraggableList from './DraggableList';
import { DragHandleRounded } from '@mui/icons-material';
import GameConfigSection from '../GameConfigSection';

function PlayerListNode({
  user,
  dragHandle = true,
}: {
  user: User;
  dragHandle?: boolean;
}): React.ReactElement {
  const username = user?.name ?? user?.id;
  return (
    <Box
      className={
        'border-2 border-blue-300 p-2 m-2 flex flex-row justify-between flex-nowrap bg-opacity-100'
      }
      bgcolor={'action.active'}
      borderRadius={20}
    >
      <Typography textOverflow={'ellipsis'} noWrap>
        {username}
      </Typography>
      {dragHandle && (
        <div className={'pl-5'}>
          <DragHandleRounded />
        </div>
      )}
    </Box>
  );
}

export default function PlayerList(props: {
  userOrder: string[];
  users: { [id: string]: User };
  gameConfig: GameConfigDto;
  onLobbyUpdate?: (lobbyUpdate: Partial<LobbyDto>) => void;
}): React.ReactElement {
  const [userIds, setUserIds] = useState(props.userOrder);
  useEffect(() => {
    setUserIds(props.userOrder);
  }, [props.userOrder]);
  const { userOrderMatters } = props.gameConfig;

  const renderPlayerNode = (id: string) => (
    <PlayerListNode user={props.users[id]} dragHandle={userOrderMatters} />
  );

  const onUpdateList = (newList: string[]) => {
    setUserIds(newList);
    if (props.onLobbyUpdate) {
      props.onLobbyUpdate({ userOrder: newList });
    }
  };

  return (
    <GameConfigSection title={userOrderMatters ? 'Player Order' : 'Players'}>
      <DraggableList
        itemIdList={userIds}
        renderItem={renderPlayerNode}
        onUpdateList={onUpdateList}
      />
    </GameConfigSection>
  );
}
