import React, { useState } from 'react';
import { UpdateLobbyAction } from '@turn-tracker-nx-nestjs-react/turn-tracker-types';
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
  onLobbyUpdate: UpdateLobbyAction;
}): React.ReactElement {
  const [isInfinite, setIsInfinite] = useState<boolean>(false);
  const [numTurns, setNumTurns] = useState<number | null>(null);
  const handleIsInfiniteChange = (e: SelectChangeEvent) => {
    setIsInfinite(e.target.value === 'infinite');
  };

  const handleNumTurnsChange = (e: SelectChangeEvent) => {
    const num = parseInt(e.target.value);
    if (num > 0) {
      setNumTurns(num);
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
            fullWidth
          />
        )}
      </Stack>
    </GameConfigSection>
  );
}
