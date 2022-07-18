import React, { useEffect, useState } from 'react';
import {
  GameConfigDto,
  UpdateLobbyAction,
} from '@turn-tracker-nx-nestjs-react/turn-tracker-types';
import GameConfigSection from './GameConfigSection';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';

export default function TurnCountSelector(props: {
  gameConfig: GameConfigDto;
  onLobbyUpdate?: UpdateLobbyAction;
}): React.ReactElement {
  const { gameConfig } = props;
  const [isInfinite, setIsInfinite] = useState<boolean>(false);
  const [numTurns, setNumTurns] = useState<number | undefined>(
    gameConfig.numTurns
  );
  useEffect(() => {
    setNumTurns(gameConfig.numTurns);
  }, [gameConfig.numTurns]);
  useEffect(() => {
    setIsInfinite(gameConfig.isInfiniteTurns);
  }, [gameConfig.isInfiniteTurns]);

  const handleIsInfiniteChange = (e: SelectChangeEvent) => {
    const newIsInfinite = e.target.value === 'infinite';
    setIsInfinite(newIsInfinite);
    if (props.onLobbyUpdate) {
      props.onLobbyUpdate({
        gameConfig: {
          ...gameConfig,
          isInfiniteTurns: newIsInfinite,
        },
      });
    }
  };

  const handleNumTurnsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value);
    let numToSend: number = num;
    if (isNaN(num)) {
      setNumTurns(undefined);
      numToSend = 0;
    } else if (num > 0) {
      setNumTurns(num);
    }
    if (props.onLobbyUpdate) {
      props.onLobbyUpdate({
        gameConfig: {
          ...gameConfig,
          numTurns: numToSend,
        },
      });
    }
  };

  return (
    <GameConfigSection title={'Turn Count'}>
      <Stack className={'mt-4'} direction={'row'} spacing={1}>
        <FormControl className={'w-full'}>
          <InputLabel id={'turn-count-label'}>Turn Type</InputLabel>
          <Select
            labelId={'turn-count-label'}
            id={'turn-count'}
            value={isInfinite ? 'infinite' : 'finite'}
            onChange={handleIsInfiniteChange}
            label={'Turn Type'}
            className={'w-full'}
          >
            <MenuItem key={'infinite'} value={'infinite'}>
              Infinite
            </MenuItem>
            <MenuItem key={'finite'} value={'finite'}>
              Finite
            </MenuItem>
          </Select>
        </FormControl>
        {!isInfinite && (
          <TextField
            label={'Number of Turns'}
            type={'number'}
            value={numTurns ?? ''}
            onChange={handleNumTurnsChange}
            fullWidth
          />
        )}
      </Stack>
    </GameConfigSection>
  );
}
