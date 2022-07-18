import React from 'react';
import {
  GameType,
  gameTypes,
  LobbyDto,
} from '@turn-tracker-nx-nestjs-react/turn-tracker-types';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';

export default function GameTypeSelector(props: {
  gameType?: GameType;
  onLobbyUpdate: (lobbyUpdate: Partial<LobbyDto>) => void;
}): React.ReactElement {
  const handleOnChange = (e: SelectChangeEvent) => {
    e.preventDefault();
    e.stopPropagation();
    props.onLobbyUpdate({
      gameType: e.target.value as GameType,
    });
  };

  return (
    <Paper className={'w-1/2 !min-w-[300px]'}>
      <FormControl className={'w-full'}>
        <InputLabel id={'game-type-selector-label'}>Game Type</InputLabel>
        <Select
          labelId={'game-type-selector-label'}
          id={'game-type-selector'}
          value={props.gameType ?? gameTypes[0]}
          onChange={handleOnChange}
          label={'Game Type'}
          className={'w-full'}
        >
          {gameTypes.map((gameType) => (
            <MenuItem key={gameType} value={gameType}>
              <Typography textOverflow={'ellipsis'}>{gameType}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
}
