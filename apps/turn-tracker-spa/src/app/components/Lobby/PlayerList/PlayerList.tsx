import React, { useEffect, useState } from 'react';
import {
  gameTypeConfig,
  LobbyDto,
  User,
} from '@turn-tracker-nx-nestjs-react/turn-tracker-types';
import { Box, Typography } from '@mui/material';
import DraggableList from './DraggableList';
import { useAtom } from 'jotai';
import lobbyAtom from '../../../state/lobby';
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
  turnOrder: string[];
  users: { [id: string]: User };
  onLobbyUpdate?: (lobbyUpdate: Partial<LobbyDto>) => void;
}): React.ReactElement {
  const [{ gameType }] = useAtom(lobbyAtom);
  const [userIds, setUserIds] = useState(props.turnOrder);
  useEffect(() => {
    setUserIds(props.turnOrder);
  }, [props.turnOrder]);
  const turnOrderMatters = gameTypeConfig[gameType]?.turnOrderMatters;

  const renderPlayerNode = (id: string) => (
    <PlayerListNode user={props.users[id]} dragHandle={turnOrderMatters} />
  );

  const onUpdateList = (newList: string[]) => {
    setUserIds(newList);
    if (props.onLobbyUpdate) {
      props.onLobbyUpdate({ turnOrder: newList });
    }
  };

  return (
    <GameConfigSection title={turnOrderMatters ? 'Player Order' : 'Players'}>
      <DraggableList
        itemIdList={userIds}
        renderItem={renderPlayerNode}
        onUpdateList={onUpdateList}
      />
    </GameConfigSection>
  );
}
