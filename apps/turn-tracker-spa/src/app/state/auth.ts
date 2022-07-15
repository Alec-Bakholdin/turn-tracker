import { useCookies } from 'react-cookie';
import { useQuery } from 'react-query';
import api from '../api/api';
import {
  AuthDto,
  UserDto,
} from '@turn-tracker-nx-nestjs-react/turn-tracker-types';
import { useEffect, useState } from 'react';

export default function useAuthQuery() {
  const [updatedUser, setUpdatedUser] = useState<
    Partial<UserDto> | undefined
  >();
  const [cookies, setCookie] = useCookies(['Authorization']);

  const saveAuthDto = (authDto: AuthDto) => {
    setCookie('Authorization', authDto.authToken, {
      sameSite: 'none',
      secure: true,
    });
  };

  const loginResponse = useQuery(
    ['auth'],
    () => {
      if (updatedUser) {
        return api
          .newToken(updatedUser, cookies.Authorization)
          .then((res) => res.data);
      }
      return api.login(cookies.Authorization).then((res) => res.data);
    },
    {
      retry: 3,
      refetchOnWindowFocus: false,
      onSuccess: saveAuthDto,
      onSettled: () => setUpdatedUser(undefined),
    }
  );

  useEffect(() => {
    if (updatedUser) {
      loginResponse.refetch();
    }
  }, [updatedUser]);

  const updateUserDto = (userDto: Partial<UserDto>) => {
    setUpdatedUser(userDto);
  };

  return {
    ...loginResponse,
    authDto: loginResponse.data,
    updateUserDto,
  };
}
