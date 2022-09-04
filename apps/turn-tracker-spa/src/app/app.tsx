import React from 'react';
import MainMenu from './components/MainMenu/MainMenu';
import { Box } from '@mui/material';
import Lobby from './components/Lobby/Lobby';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import NoRouteMatch from './components/NoRouteMatch';
import UsernameDialog from './components/UsernameDialog';
import useAuthQuery from './state/auth';

function App() {
  const [searchParams] = useSearchParams();
  const { authDto } = useAuthQuery();

  return (
    <Box className={'w-full'}>
      <Box className={'w-full pb-10 flex justify-center'}>
        <UsernameDialog />
        <Routes>
          <Route
            path={'/'}
            element={
              authDto?.user.name && searchParams.has('lobby') ? (
                <Lobby />
              ) : (
                <MainMenu />
              )
            }
          />
          <Route path={'*'} element={<NoRouteMatch />}></Route>
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
