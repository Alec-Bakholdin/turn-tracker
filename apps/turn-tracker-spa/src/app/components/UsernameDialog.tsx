import React, { useState } from 'react';
import { Popover, Stack, TextField } from '@mui/material';
import useAuthQuery from '../state/auth';
import LoadingTextButton from './LoadingTextButton';

export default function UsernameDialog(): React.ReactElement {
  const { authDto, isLoading, updateUserDto } = useAuthQuery();
  const [username, setUsername] = useState('');

  const handleSubmit = () => {
    updateUserDto({ name: username });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <Popover
      open={Boolean(!authDto?.user.name)}
      anchorReference={'anchorPosition'}
      anchorPosition={{
        top: window.innerHeight / 2,
        left: window.innerWidth / 2,
      }}
      transformOrigin={{ vertical: 'center', horizontal: 'center' }}
    >
      <Stack spacing={2} className={'m-10 items-center'}>
        <TextField
          label={'Username'}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <LoadingTextButton text={'SUBMIT'} loading={isLoading} />
      </Stack>
    </Popover>
  );
}
