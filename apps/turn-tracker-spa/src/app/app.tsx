import React from 'react';
import MainMenu from './components/MainMenu/MainMenu';
import { Box } from '@mui/material';
import Lobby from './components/Lobby/Lobby';
import { Route, Routes } from 'react-router-dom';
import NoRouteMatch from './components/NoRouteMatch';

function App() {
  return (
    <Box className={'w-full'}>
      <Box className={'w-full pb-10 flex justify-center'}>
        <Routes>
          <Route path={'/'} element={<MainMenu />} />
          <Route path={'/lobby/:lobbyId'} element={<Lobby />} />
          <Route path={'*'} element={<NoRouteMatch />}></Route>
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
